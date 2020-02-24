import newrelic from 'newrelic'
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

///// Organization Controllers /////
import {
   getOrganization,
   getOrganizationUsers,
   getOrganizationManagers,
   postOrganization,
   patchOrganization,
   deleteOrganization,
} from './controllers/organization'

///// Role Controllers /////
import { getRoles, getRole, postRoles, patchRoles, deleteRoles } from './controllers/roles'

///// Department Controllers /////
import {
   getDepartment,
   getDepartments,
   postDepartment,
   patchDepartment,
   deleteDepartment,
} from './controllers/department'

///// Location Controllers /////
import {
   getLocation,
   getLocations,
   postLocation,
   patchLocation,
   deleteLocation,
} from './controllers/location'

///// User/Employee Controllers /////
import { getUser, getUsers, postUser, patchUser, deleteUser } from './controllers/user'

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

/* Organization */
app.get(`${api_base}/organizations`, firebaseAuth, makeExpressCallback(getOrganization))
app.post(`${api_base}/organizations`, firebaseAuth, makeExpressCallback(postOrganization))
app.patch(`${api_base}/organizations/:id`, firebaseAuth, makeExpressCallback(patchOrganization))
app.delete(`${api_base}/organizations/:id`, firebaseAuth, makeExpressCallback(deleteOrganization))
//// Organization based API ---- To find data by organization
app.get(
   `${api_base}/organizations/:id/users/`,
   firebaseAuth,
   makeExpressCallback(getOrganizationUsers),
)
app.get(
   `${api_base}/organizations/:id/managers/`,
   firebaseAuth,
   makeExpressCallback(getOrganizationManagers),
)
app.get(
   `${api_base}/organizations/:id/departments/`,
   firebaseAuth,
   makeExpressCallback(getDepartments),
)
app.get(`${api_base}/organizations/:id/locations/`, firebaseAuth, makeExpressCallback(getLocations))

/* Role */
app.get(`${api_base}/roles`, firebaseAuth, makeExpressCallback(getRoles))
app.post(`${api_base}/roles`, firebaseAuth, makeExpressCallback(postRoles))
app.get(`${api_base}/roles/:id`, firebaseAuth, makeExpressCallback(getRole))
app.patch(`${api_base}/roles/:id`, firebaseAuth, makeExpressCallback(patchRoles))
app.delete(`${api_base}/roles/:id`, firebaseAuth, makeExpressCallback(deleteRoles))

/* Department */
app.post(`${api_base}/departments`, firebaseAuth, makeExpressCallback(postDepartment))
app.get(`${api_base}/departments`, firebaseAuth, makeExpressCallback(getDepartments))
app.get(`${api_base}/departments/:id`, firebaseAuth, makeExpressCallback(getDepartment))
app.patch(`${api_base}/departments/:id`, firebaseAuth, makeExpressCallback(patchDepartment))
app.delete(`${api_base}/departments/:id`, firebaseAuth, makeExpressCallback(deleteDepartment))

/* Location */
app.post(`${api_base}/locations`, firebaseAuth, makeExpressCallback(postLocation))
app.get(`${api_base}/locations`, firebaseAuth, makeExpressCallback(getLocations))
app.get(`${api_base}/locations/:id`, firebaseAuth, makeExpressCallback(getLocation))
app.patch(`${api_base}/locations/:id`, firebaseAuth, makeExpressCallback(patchLocation))
app.delete(`${api_base}/locations/:id`, firebaseAuth, makeExpressCallback(deleteLocation))

/* User/Employee */

app.post(`${api_base}/users`, firebaseAuth, makeExpressCallback(postUser))
app.get(`${api_base}/users`, firebaseAuth, makeExpressCallback(getUsers))
app.get(`${api_base}/users/:id`, firebaseAuth, makeExpressCallback(getUser))
app.patch(`${api_base}/users/:id`, firebaseAuth, makeExpressCallback(patchUser))
app.delete(`${api_base}/users/:id`, firebaseAuth, makeExpressCallback(deleteUser))

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
