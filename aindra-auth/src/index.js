import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import morgan from 'morgan'
import path from 'path'
import fs from 'fs'
import * as firebaseAdmin from 'firebase-admin'
import swaggerUi from 'swagger-ui-express'

import makeExpressCallback from './express_callback'
import firebaseConfig from './_helpers/firebase.config'
import firebaseAuth from './_helpers/firebase-authentication'
import apiDocumentation from '../doc/openapi.json'

import { login } from "./controllers/index"


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
    databaseURL: 'https://studywiseapp.firebaseio.com',
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

app.use(`${api_base}/admin/api-docs`, swaggerUi.serve, swaggerUi.setup(apiDocumentation));
app.get(`${api_base}/login`, makeExpressCallback(login));

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

module.exports = app