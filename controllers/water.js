const { DateTime } = require('luxon')
const { Router } = require('express')
const Water = require('../models/water')

class WaterController {
  constructor(r) {
    this.router = r
    this.router.post('/', this.Create)
    this.router.get('/from/:oldest/to/:newest', this.Between)
  }

  /**
   * @api {post} /water Create New Water Intake Entry
   * @apiName CreateWater
   * @apiGroup /water
   * @apiDescription To create a new water intake entry, send a POST request
   * of Content-Type "application/json" to the endpoint "/water" with a plain-text
   * body that is, itself, a JSON object describing the entry you're about to
   * create. **The document** you post **MUST BE VALID JSON**. For example, it
   * **CANNOT CONTAIN LEADING ZEROS** for the values because those are invalid
   * according to the JSON spec itself. Also, don't make them strings either.
   *
   * @apiExample {json} Raw HTTP POST body
   *       {
   *         "ml": 320
   *       }
   *
   * @apiSuccessExample {json} Success-Response:
   *       {
   *         "water": {
   *           "id": "661bf744-c8d9-4ccd-a646-3723f0df5515",
   *           "createdAt": "2021-06-29T11:17:51.809Z",
   *           "updatedAt": "2021-06-29T11:17:51.809Z",
   *           "ml": 320
   *         }
   *       }
   *
   */

  async Create(req, res, next) {
    try {
      const water = await Water.create(Number(req.body.ml))
      res.json({ water: water })
    } catch(e) {
      next(e)
    }
  }

  /**
   * @api {get} /water/from/:oldest/to/:newest Get Water Intake Entries
   * @apiName GetWater
   * @apiGroup /water
   * @apiDescription Retrieve all water intake entries between the times
   * represented by `:oldest` and `:newest`, both as **milliseconds since the
   * UNIX epoch**, _inclusive_. No pagination.
   *
   * @apiParam {Number} oldest Start time (Unix epoch, milliseconds)
   * @apiParam {Number} newest End time (Unix epoch, milliseconds)
   *
   * @apiExample {curl} Example
   *       curl http://localhost:3000/water/from/1624384948000/to/1624989748000
   *
   *       {
   *         "water": [
   *           {
   *             "id": "661bf744-c8d9-4ccd-a646-3723f0df5515",
   *             "createdAt": "2021-06-29T11:17:51.809Z",
   *             "updatedAt": "2021-06-29T11:17:51.809Z",
   *             "ml": 320
   *           },
   *           {
   *             "id": "6a3f8dac-a373-41c4-81a9-2a06034aa674",
   *             "createdAt": "2021-06-29T08:19:35.370Z",
   *             "updatedAt": "2021-06-29T08:19:35.370Z",
   *             "ml": 253
   *           }
   *         ]
   *       }
   *
   */


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
