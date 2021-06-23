require('dotenv').config()
const log = require('../lib/log')
const { DateTime } = require('luxon')
const BP = require('../models/bp')
var express = require('express')
var router = express.Router()

// POST /bp
// Takes a plain-text (JSON) body like the following and creates a bp_entry
// object with it. For example:
//
// {
//   "diastolic": 97,
//   "systolic": 83,
//   "heartrate": 88
// }
//
// Would create a new corresponding blood pressure entry object with those vals.
router.post('/', async function(req, res, next) {
  try {
    var bp = await BP.create(req.body.diastolic, req.body.systolic, req.body.heartrate)
    res.json({ bp: bp })
  } catch(e) {
    log.error(e)
    next(e)
  }
})

// /bp/from/MS/to/MS
// Inclusive. Returns all blood pressure entries between the first parameter
// (oldest) in milliseconds to the second parameter (newest) in milliseconds.
// The values here should be milliseconds since the UNIX epoch (UTC).
router.get('/from/:oldest/to/:newest', async function(req, res, next){
  try {
    var oldest = new Date(Number(req.params.oldest))
    var newest = new Date(Number(req.params.newest))
    var bp_entries = await BP.between(oldest, newest)
    res.json({ bp_entries: bp_entries })
  } catch(e) {
    log.error(e)
    next(e)
  }
})

module.exports = router
