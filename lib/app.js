// This file is used for setting up some basic configuration options and/or
// functions that can be used elsewhere to make determinations about config,
// etc.
const AppLog = require('./log')
const Controllers = require('../controllers')
const express = require('express')

// Define a list of possible values that may indicate what runtime we're in
// (for example, production, staging, etc.)
const potentialRuntimes = {
  production:    ['prod', 'production', 'release', 'master', 'main', 'blue', 'green' ],
  staging:       [ 'stage', 'staging', 'lle', 'beta', 'next', 'new' ],
  test:          [ 'test', 'testing' ],
  development:   [ 'dev', 'development', 'work' ]
}

// This tells us the potential keys to look for on process.env to determine what
// the application's runtime should be. Is it NODE_ENV? ENV? APP_ENV?
const potentialRuntimeKeys = [
  'NODE_ENV', 'APP_ENV', 'RUNTIME', 'RUNTIME_ENV', 'LEVEL',
]

// This function figures out the runtime environment (e.g. 'staging', 'prod')
// for the app. Used by the constructor function on the App class below.
function determineRuntime(defaultEnv = 'development') {
  let runtime
  for(const k in potentialRuntimeKeys) {
    if(process.env.hasOwnProperty(k)) {
      runtime = process.env[k]
      break
    }
  }

  // Loops over all the keys (which represent the actual runtime) in the
  // potentialRuntimes object, and if the above value exists in the value of
  // *that* key, we return that key itself to determine the actual app runtime.
  for (const [k, v] of Object.entries(potentialRuntimes)) {
    if(v.includes(runtime)) {
      return k
    }
  }

  // If we made it this far, for some reason we don't have a known config.
  // Just return the default.
  return defaultEnv
}

// This function tells us whether or not to colorize log output. Off by default.
function determineColorizeLogs(rt) {
  // Look for the simplest way first; this will override all other settings if
  // the COLORIZE_LOGS environment variable is set to true.
  if(process.env.COLORIZE_LOGS) {
    return true
  }

  // If the overriding environment variable isn't set, we determine it from
  // the runtime. Off for staging and prod, otherwise on.
  switch(rt) {
    case 'production':
    case 'staging':
      return false
    default:
      return true
  }
}

// Set up the class for the App object
class App {
  constructor() {
    this.runtime = determineRuntime()
    this.colorizeLogs = determineColorizeLogs(this.runtime)
    this.log = new AppLog(this.colorizeLogs)
    this.api = express().use((req, res, next) => {
      req.headers['content-type'] = req.headers['content-type'] || 'application/json'
      next()
    }).use(express.json()).use(this.log.apiLog)

  }

  // This is the main shutdown function, called when it's time for the app to
  // terminate for any reason.
  async handleShutdown() {
  }

  // Function to mount a given controller at a given path
  mount(path, controller) {
    this.api.use(path, controller.router)
  }

  // Primary app execution entry point.
  main() {
    this.mount('/', Controllers.HomeController)
    this.mount('/bp', Controllers.BPController)
    this.mount('/water', Controllers.WaterController)
    this.api.listen(process.env.PORT)
  }
}

// Declare the API itself and export it
module.exports = new App()
