require('dotenv').config()
const { DateTime } = require('luxon')
const Water = require('../models/water')
var express = require('express')
var router = express.Router()

// POST /water
// Takes a plain-text (JSON) body like the following and creates a water intake
// entry with the corresponding values. For example:
// {
//   "ml": 500
// }
//
// Would create an entry stating that you drank half a liter of water.
//
// > But the user doesn't know how many ml s/he drank!
// Valid concern, totally. That's why I recommend your front-end help the user
// figure that out (especially in the US). Educate them with some help text,
// and provide approximations they can use at the click of a button. For example
// here in the US we generally call "one glass of water" 8 fluid ounces, which
// converts to about 237 ml. A gallon is 3785 ml. You get the idea.
router.post('/', async function(req, res, next) {
  try {
    var water = await Water.create(Number(req.body.ml))
    res.json({ water_entry: water })
  } catch(e) {
    console.error(e.message, e.stack)
    next(e)
  }
})

// /water/from/MS/to/MS
// Inclusive. Returns all water intake entries from the date/time represented
// by time since the Unix epoch in MS (oldest, first param) to the same for the
// second param (newest). Both values should be whole numbers, in milliseconds,
// since the UNIX epoch (UTC).
router.get('/from/:oldest/to/:newest', async function(req, res, next) {
  try {
    var oldest = new Date(Number(req.params.oldest))
    var newest = new Date(Number(req.params.newest))
    var water_entries = await Water.between(oldest, newest)
    res.json({ water_entries: water_entries })
  } catch(e) {
    console.error(e.message, e.stack)
    next(e)
  }
})

module.exports = router
