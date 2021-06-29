const { DateTime } = require('luxon')
const { Router } = require('express')
const BP = require('../models/bp')

class BPController {
  constructor(r) {
    this.router = r
    this.router.post('/', this.Create)
    this.router.get('/from/:oldest/to/:newest', this.Between)
  }

  /**
   * @api {post} /bp Create New Blood Pressure Entry
   * @apiName CreateBloodPressure
   * @apiGroup /bp
   * @apiDescription To create a new Blood Pressure object, send a POST request
   * of Content-Type "application/json" to the endpoint "/bp" with a plain-text
   * body that is, itself, a JSON object describing the entry you're about to
   * create. **The document** you post **MUST BE VALID JSON**. For example, it
   * **CANNOT CONTAIN LEADING ZEROS** for the values because those are invalid
   * according to the JSON spec itself. Also, don't make them strings either.
   *
   * @apiExample {json} Raw HTTP POST body
   *       {
   *         "diastolic": 93,
   *         "systolic": 80,
   *         "heartrate": 73
   *       }
   *
   * @apiSuccessExample {json} Success-Response:
   *       {
   *         "bp": {
   *           "id": "ec51e7a0-b87a-4b2d-9035-85565c8770d6",
   *           "createdAt": "2021-06-29T10:50:46.064Z",
   *           "updatedAt": "2021-06-29T10:50:46.064Z",
   *           "diastolic": 17,
   *           "systolic": 80,
   *           "heartrate": 75
   *         }
   *       }
   *
   */

  async Create(req, res, next) {
    try {
      const bp = await BP.create(req.body.diastolic, req.body.systolic, req.body.heartrate)
      res.json({ bp: bp })
    } catch(e) {
      next(e)
    }
  }

  /**
   * @api {get} /bp/from/:oldest/to/:newest Get Blood Pressure Entries
   * @apiName GetBloodPressure
   * @apiGroup /bp
   * @apiDescription To get any number of blood pressure entires, run an HTTP
   * GET request against the URL as defined above (example below). The `:oldest`
   * and `:newest` params need to be **MILLI**SECONDS since the Unix epoch
   * (which is, by definition, already in UTC). The API will respond back with
   * an array of every Blood Pressure object between those dates (_inclusive_).
   *
   * @apiParam {Number} oldest Start time (Unix epoch, milliseconds)
   * @apiParam {Number} newest End time (Unix epoch, milliseconds)
   *
   * @apiExample {curl} Example
   *       curl http://localhost:3000/bp/from/1624384948000/to/1624989748000
   *
   *       {
   *         "bp_entries": [
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
   *       }
   *
   */

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
