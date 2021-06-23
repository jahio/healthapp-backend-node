require('dotenv').config()
const winston = require('winston')
const Table = require('cli-table')

// Specify basic, custom format for log messages:
// const fmt = winston.format.printf((info) => {
//   var t = new Table()
//   t.push(
//     { timestamp: info.timestamp },
//     { logLevel: info.level },
//     { message: info.message },
//   )
//   // t.push(Object.values(info.metadata))
//   // var out = `[${info.timestamp}] [${info.level}] ${info.message}\n`
//   // out += `${t.toString()}`
//   return t.toString()
// })

// Set the default log format
// TODO: Change this up to JSON or something similar if in production
const lf = winston.format.combine(
  winston.format.cli(),
  winston.format.errors({ stack: true }),
  winston.format.colorize({ level: true }),
  winston.format.metadata(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:SSS Z'}),
)

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  exitOnError: false,
  defaultMeta: {
    pid: process.pid,
    os: process.platform,
    nodeVersion: process.version,
    // invocation: process.argv.join(' '),
  }
})

logger.add(new winston.transports.Console({
  format: lf,
  handleExceptions: true,
  handleRejections: true
}))

module.exports = logger
