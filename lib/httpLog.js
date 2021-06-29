class HTTPLog {
  constructor(logger) {
    const cfg = {
      logger: logger,
      genReqId: function(req) { return req.id },
      serializers: {
        req(req) {
          req.body = req.raw.body
          return req
        },
        res(res) {
          res.body = res.raw.body
          return res
        }
      }
    }
    this.logger = require('pino-http')(cfg)
  }
}

module.exports = HTTPLog
