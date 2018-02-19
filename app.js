var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()
const routes = require('./routes/index')
require('dotenv').config({ path: 'variables.env'});
var token = process.env.token
var verify_token = process.env.verify_token

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

// Process application/json
app.use(bodyParser.json())

app.use('/',routes)

app.use('/webhook',routes)


module.exports = app
