const mongoose = require('mongoose')
const pkg = require('../package.json')

const NODE_ENV = 'development'
const APP_NAME = `${pkg.name}`
const MONGODB_ONLINE_URI = ''
const MONGODB_LOCAL_URI = 'mongodb://localhost/tofa-assessment'

global = {
  ...global,
  MONGODB_ONLINE_URI,
  MONGODB_LOCAL_URI,
  NODE_ENV,
  APP_NAME,
}

module.exports = () => {
  const onlineConnectionUrl = global.MONGODB_ONLINE_URI
  const localConnectionUrl = global.MONGODB_LOCAL_URI

  mongoose.connect(
    global.NODE_ENV === 'development'
      ? localConnectionUrl
      : onlineConnectionUrl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  const db = mongoose.connection

  db.once('open', () =>
    console.log(`Connected to MongoDB -> ${global.APP_NAME}`)
  )

  db.on('error', (err) => console.log({ ...err }))

  return db
}
