/*
  Health App Backend (Node.js)
  Simple API to let you track your blood pressure and water intake. Manual entry
  only. Needs a corresponding front-end to be useful.
*/

// Declare the app "global" here
const app = require('./lib/app')

// Run the app in async mode so we can disconnect from the database cleanly
// when restarted.
app.main()
