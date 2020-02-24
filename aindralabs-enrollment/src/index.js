import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import morgan from 'morgan'
import path from 'path';
import fs from 'fs';
import setCorrelationId  from 'express-mw-correlation-id'

import upload from './helpers/upload'
import models from '../src/models/index'
import makeExpressCallback from "./express_callback";
import { postEnrollment, postBlackbox } from './controllers/enrollment'
import { postVerification, postVerificationBlackbox } from './controllers/verification'
import { auditController } from './controllers/audit'
import checkIfAuthenticated  from './firebase/authentication.js'

const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('./openApiDocumentation.js');

dotenv.config()
const api_base = process.env.API_BASE
const port = process.env.PORT


// create log directory
var logDirectory = path.join(__dirname, 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)



// create a rotating write stream
var rfs = require('rotating-file-stream')
var accessLogStream = rfs('requests.log', {
    interval: '1d', // rotate daily
    path: logDirectory
})

// check audit db
 auditController()

//setup express app
const app = express();
app.use(setCorrelationId())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit:50000}));
app.use(bodyParser.raw({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(`${api_base}/images` ,express.static('images'));

app.use((_, res, next) => {
    res.set({ Tk: '!' })
    next()
})


// Morgan logger
app.use(morgan('dev', {
    skip: function (req, res) { return res.statusCode < 200 }
}))
app.use(morgan('tiny', { stream: accessLogStream }));



//// API ////
app.post(`${api_base}/enrolluser`, checkIfAuthenticated, upload.fields([
  {name: "enrollImages1",maxCount:1},
  {name: "enrollImages2",maxCount:1},
  {name: "enrollImages3",maxCount:1},
  {name: "enrollImages4",maxCount:1},
  {name: "enrollImages5",maxCount:1},
]),makeExpressCallback(postEnrollment));

app.post(`${api_base}/enrolluserfv`, makeExpressCallback(postBlackbox));

app.post(`${api_base}/verifyuser`, checkIfAuthenticated, upload.fields([
  {name: "verifyImages1",maxCount:1},
  {name: "verifyImages2",maxCount:1},
  {name: "verifyImages3",maxCount:1},
]),makeExpressCallback(postVerification));

app.post(`${api_base}/verifyuserfv`, makeExpressCallback(postVerificationBlackbox));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

models.sequelize.sync({
  force: false
}).then(() => {
    console.log('Nice! Database looks fine ');
    app.listen(port, () => {
        console.log('Running server on ' + port);
    });
}).catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!");
});
