/*
  Health App Backend (Node.js)
  Simple API to let you track your blood pressure and water intake. Manual entry
  only. Needs a corresponding front-end to be useful.
*/

// Logger: use it like `log.error('some str'), log.info('info here')` etc
const log = require('./lib/log')

const express = require('express')
const app = express()

// This is a utility function to give us debug info on requests
function logRequest(req, res, next) {
  log.debug(req.params)
  log.debug(req.body)
  next()
}

// Controllers
const IndexController = require('./controllers/index')
const BPController = require('./controllers/bp')
const WaterController = require('./controllers/water')

// Utility function to set the content-type header for any request missing it
// Forces all requests without it to be application/json
function setContentType(req, res, next) {
  req.headers['content-type'] = req.headers['content-type'] || 'application/json'
  next()
}

app.use(logRequest)
app.use(setContentType)
app.use(express.json())
app.use('/', IndexController)
app.use('/bp', BPController)
app.use('/water', WaterController)

// Bind to a port and serve requests
app.listen(process.env.PORT)
