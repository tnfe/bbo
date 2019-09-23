const moment = require('moment')

process.env.RAVEN_VERSION = `ppo@${moment().format('YYYY-MM-DD HH:mm:ss')}`

const config = {
  cdnPrefix: 'debug/',
  sentryConfig: {
    project: 'ppo',
    apiKey: process.env.SENTRY_APIKEY,
    suppressErrors: true,
    release: process.env.RAVEN_VERSION
  }
}

module.exports = config
