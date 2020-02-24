import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import morgan from 'morgan'
import path from 'path'
import fs from 'fs'
import * as firebaseAdmin from 'firebase-admin'
import cron from 'node-cron'
import swaggerUi from 'swagger-ui-express'

import makeExpressCallback from './express_callback'
import firebaseConfig from './_helpers/firebase.config'
import firebaseAuth from './_helpers/firebase-authentication'
import apiDocumentation from './doc/openapi.json'

///// License Keys Controllers /////
import { getLicenseKeys, postLicenseKey, patchLicenseKey } from './controllers/license-keys'

///// License Plans Controllers /////
import { getLicensePlans, postLicensePlan, patchLicensePlan } from './controllers/license-plans'
import deactivateLicenseKeys from './_helpers/deactivation-task'

dotenv.config()

const api_base = process.env.API_BASE || '/api'
const port = parseInt(process.env.PORT, 10) || 8000

var rfs = require('rotating-file-stream')
var logDirectory = path.join(__dirname, 'logs')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = rfs('requests.log', {
   interval: '1d', // rotate daily
   path: logDirectory,
})

firebaseAdmin.initializeApp({
   credential: firebaseAdmin.credential.cert(firebaseConfig),
   databaseURL: 'https://aindra-attendance-acec8.firebaseio.com',
})

// Set up the express app
const app = express()
//
app.use(function(req, res, next) {
   res.header('Access-Control-Allow-Origin', '*')
   res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
   res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
   )
   next()
})

// Parse incoming requests data (https://github.com/expressjs/body-parser)
// Body Parser Middleware
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyParser.raw({ limit: '50mb', extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use((_, res, next) => {
   res.set({ Tk: '!' })
   next()
})

// Morgan logger
app.use(
   morgan('dev', {
      skip: function(req, res) {
         return res.statusCode < 200
      },
   }),
)
app.use(morgan('tiny', { stream: accessLogStream }))

//// APIs ////

app.use(`${api_base}/admin/api-docs`, swaggerUi.serve, swaggerUi.setup(apiDocumentation))

/* License Keys */
app.get(`${api_base}/license-keys`, firebaseAuth, makeExpressCallback(getLicenseKeys))
app.post(`${api_base}/license-keys`, firebaseAuth, makeExpressCallback(postLicenseKey))
app.patch(`${api_base}/license-keys/:id`, firebaseAuth, makeExpressCallback(patchLicenseKey))

/* License Plans */
app.get(`${api_base}/license-plans`, firebaseAuth, makeExpressCallback(getLicensePlans))
app.post(`${api_base}/license-plans`, firebaseAuth, makeExpressCallback(postLicensePlan))
app.patch(`${api_base}/license-plans/:id`, firebaseAuth, makeExpressCallback(patchLicensePlan))

// Models
const models = require('./models/index')
models.sequelize
   .sync({
      force: false,
   })
   .then(() => {
      console.log('Nice! Database looks fine')
      app.listen(port, () => {
         console.log('Running server on ' + port)
      })
   })
   .catch(function(err) {
      console.log(err, 'Something went wrong with the Database Update!')
   })

/* Cron task for deactivating expired license keys at 2 AM every day */
/*
   # ┌──────────── minute
   # │ ┌────────── hour
   # │ │ ┌──────── day of month
   # │ │ │ ┌────── month
   # │ │ │ │ ┌──── day of week
   # │ │ │ │ │
   # │ │ │ │ │
   # * * * * *
 */

cron.schedule('0 2 * * *', () => {
   console.log('Checking for expired licence keys')
   deactivateLicenseKeys()
})

module.exports = app
