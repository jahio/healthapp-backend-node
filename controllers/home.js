const BP = require('../models/bp')
const Water = require('../models/water')
const { DateTime } = require('luxon')
const { Router }= require('express')

class HomeController {
  constructor(r) {
    this.router = r
    this.router.get('/', this.Home)
  }

  /**
   * @api {get} / Get overview data for the last 7 days (for a dashboard)
   * @apiName APIRoot
   * @apiGroup /
   * @apiDescription Returns the last 7 days of data for both blood pressure
   * entries as well as water intake entries. No pagination. No params.
   *
   * @apiExample {curl} Example
   *       curl http://localhost:3000/
   *       {
   *         "bp": [
   *           {
   *             "id": "ec51e7a0-b87a-4b2d-9035-85565c8770d6",
   *             "createdAt": "2021-06-29T10:50:46.064Z",
   *             "updatedAt": "2021-06-29T10:50:46.064Z",
   *             "diastolic": 17,
   *             "systolic": 80,
   *             "heartrate": 75
   *           },
   *           {
   *             "id": "d59bf1d0-2888-493d-b37b-d2fcc1609989",
   *             "createdAt": "2021-06-29T08:19:47.248Z",
   *             "updatedAt": "2021-06-29T08:19:47.248Z",
   *             "diastolic": 62,
   *             "systolic": 20,
   *             "heartrate": 54
   *           }
   *         ]
   *         "water": [
   *           {
   *             "id": "6a3f8dac-a373-41c4-81a9-2a06034aa674",
   *             "createdAt": "2021-06-29T08:19:35.370Z",
   *             "updatedAt": "2021-06-29T08:19:35.370Z",
   *             "ml": 253
   *           },
   *           {
   *             "id": "a5591500-04cf-4db2-9cbf-3569fabc78b8",
   *             "createdAt": "2021-06-29T08:19:33.552Z",
   *             "updatedAt": "2021-06-29T08:19:33.552Z",
   *             "ml": 638
   *           }
   *         ]
   *       }
   *
   */

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
