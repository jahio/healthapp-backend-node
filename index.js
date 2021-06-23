/*
  Health App Backend (Node.js)
  Simple API to let you track your blood pressure and water intake. Manual entry
  only. Needs a corresponding front-end to be useful.
*/

// // Set up dotenv for using .env files
// require('dotenv').config()
//
// // Date and time library
// const { DateTime } = require('luxon')
//
// // Fetch the models
// const BP = require('./models/bp')
//
// // DB Handler
// const db = require('./lib/db')

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

// Set up express, our HTTP layer, and morgan, the logging layer
const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(morgan('combined'))
app.use(setContentType)
app.use(express.json())
app.use('/', IndexController)
app.use('/bp', BPController)
app.use('/water', WaterController)
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500
//   console.error(err.message, err.stack)
//   res.status(statusCode).json({status: statusCode, error: err.message})
//   next(err)
// })

// Bind to a port and serve requests
app.listen(process.env.PORT)
