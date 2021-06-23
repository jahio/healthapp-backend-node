require('dotenv').config()
const log = require('../lib/log')
const { DateTime } = require('luxon')
const BP = require('../models/bp')
const Water = require('../models/water')
var express = require('express')
var router = express.Router()

router.get('/', async function(req, res, next) {
  try {
    var now = DateTime.utc()
    var old = now.minus({ days: 7 })
    var bp_entries = await BP.between(old.toJSDate(), now.toJSDate())
    var water_entries = await Water.between(old.toJSDate(), now.toJSDate())
    res.json({ bp: bp_entries, water_entries: water_entries })
  } catch(e) {
    log.error(e)
    next(e)
  }
})

module.exports = router
