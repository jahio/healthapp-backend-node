const BP = require('../models/bp')
const Water = require('../models/water')
const { DateTime } = require('luxon')
const { Router }= require('express')

class HomeController {
  constructor(r) {
    this.router = r
    this.router.get('/', this.Home)
  }

  async Home(req, res, next) {
    try {
      const now = DateTime.utc()
      const then = now.minus({ days: 7 })
      res.json({
        bp: await BP.between(then.toJSDate(), now.toJSDate()),
        water: await Water.between(then.toJSDate(), now.toJSDate())
      })
    } catch(e) {
      next(e)
    }
  }
}

module.exports = new HomeController(Router())
