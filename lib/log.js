const pino = require('pino')
const epino = require('express-pino-logger')
const pretty = require('pino-pretty')
const { name, version } = require('../package.json')

// Declare a class we can later set up with proper config
class AppLog {
  constructor(pretty = false) {
    const cfg = {
      name: `${name} v${version} [PID ${process.pid}] (node.js ${process.version}) `,
    }
    if(pretty) {
      cfg.prettyPrint = true
      cfg.prettifier = pretty
    }

    this.log = pino(cfg)
    const apiCfg = {
      ...cfg,
      logger: this.log,
      serializers: { req: (req) => (
        { method: req.method, url: req.url, body: req.raw.body }
      )}
    }
    this.apiLog = epino(apiCfg)
  }
}

module.exports = AppLog
