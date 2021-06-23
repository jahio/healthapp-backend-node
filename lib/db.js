// Set up dotenv for using .env files
require('dotenv').config()

// Set up prisma (ORM); DB connection details are in .env and this is going to
// expect an environment variable of DATABASE_URL (string) in the form of:
// postgresql://user:password@host:5432/dbname
const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient({
  errorFormat: 'pretty',
  log: [
    { level: 'warn', emit: 'stdout' },
    { level: 'info', emit: 'stdout' },
    { level: 'error', emit: 'stdout' },
    { level: 'query', emit: 'stdout' }
  ]
})

module.exports = db
