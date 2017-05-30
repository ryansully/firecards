// Write environment variables for Firebase app configuration
const fs = require('fs')
const client = require('firebase-tools')
const chalk = require('chalk')

const CAMEL_CASE_REGEXP = /([a-z0-9])([A-Z])/g
const writePath = '.env.local'

module.exports = () => {
  console.log(chalk.white(`Writing Firebase app configuration environment variables to ${writePath}...`))

  client.setup.web().then((data) => {
    const stream = fs.createWriteStream(writePath)
    stream.once('open', (fd) => {
      for (const key in data) {
        const varString = `REACT_APP_FIREBASE_${key.replace(CAMEL_CASE_REGEXP, '$1_$2').toUpperCase()}="${data[key]}"\n`
        stream.write(varString)
      }
      stream.end()
      console.log(chalk.white(`Installation complete!`))
    })
  })
}