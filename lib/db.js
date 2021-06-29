// Set up prisma (ORM); DB connection details come from an environment variable
// named DATABASE_URL (string) in the form of:
// postgresql://user:password@host:5432/dbname
const { PrismaClient } = require('@prisma/client')
module.exports = new PrismaClient({
  // Seeing lots of errors where after the Node.js process is restarted, Prisma
  // complains that the port it wants to use for its connection pooling process
  // is already in use. The below internal override MIGHT help? More info:
  // https://github.com/prisma/prisma/issues/5533#issuecomment-788016345
  __internal: {
    useUds: true
  },
  errorFormat: 'pretty', // TODO: Determine this from the app object
  log: [
    { level: 'warn', emit: 'stdout' },
    { level: 'info', emit: 'stdout' },
    { level: 'error', emit: 'stdout' },
    { level: 'query', emit: 'stdout' }
  ]
})
