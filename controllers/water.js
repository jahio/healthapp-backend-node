const { DateTime } = require('luxon')
const { Router } = require('express')
const Water = require('../models/water')

class WaterController {
  constructor(r) {
    this.router = r
    this.router.post('/', this.Create)
    this.router.get('/from/:oldest/to/:newest', this.Between)
  }

  async Create(req, res, next) {
    try {
      const water = await Water.create(Number(req.body.ml))
      res.json({ water: water })
    } catch(e) {
      next(e)
    }
  }

  async Between(req, res, next) {
    try {
      var oldest = new Date(Number(req.params.oldest))
      var newest = new Date(Number(req.params.newest))
      var water_entries = await Water.between(oldest, newest)
      res.json({ water: water_entries })
    } catch(e) {
      next(e)
    }
  }
}

module.exports = new WaterController(Router())
