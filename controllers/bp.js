const { DateTime } = require('luxon')
const { Router } = require('express')
const BP = require('../models/bp')

class BPController {
  constructor(r) {
    this.router = r
    this.router.post('/', this.Create)
    this.router.get('/from/:oldest/to/:newest', this.Between)
  }

  async Create(req, res, next) {
    try {
      const bp = await BP.create(req.body.diastolic, req.body.systolic, req.body.heartrate)
      res.json({ bp: bp })
    } catch(e) {
      next(e)
    }
  }

  async Between(req, res, next) {
    try {
      var oldest = new Date(Number(req.params.oldest))
      var newest = new Date(Number(req.params.newest))
      var bp_entries = await BP.between(oldest, newest)
      res.json({ bp_entries: bp_entries })
    } catch(e) {
      next(e)
    }
  }
}

module.exports = new BPController(Router())
