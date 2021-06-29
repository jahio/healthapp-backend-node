const BP = require('../models/bp')
const Water = require('../models/water')
const { DateTime } = require('luxon')

class HomeController {
  constructor(req, res, next) {
    this.req = req ; this.res = res ; this.next = next
  }
  static async getHome(req = this.req, res = this.res, next = this.next) {
    try {
      const t = {
        now: DateTime.utc().toJSDate(),
        ago: now.minus({ days: 7 }).toJSDate()
      }
      res.json({
        bp: await BP.between(t.ago, t.now),
        water_entries: await Water.between(t.ago, t.now)
      })
    } catch(e) {
      throw e
    } finally {
      next()
    }
  }
}

module.exports = HomeController
