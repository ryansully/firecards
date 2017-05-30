// import decks to Firebase database
const async = require('async')
const chalk = require('chalk')
const exec = require('child_process').exec
const fs = require('fs')
const path = require('path')

const deckPath = '/decks'
const dirPath = `data${deckPath}`

function main() {
  fs.readdir(dirPath, (err, files) => {
    async.parallel(files.map((file) => () => {
      const dbPath = `${deckPath}/${path.basename(file, '.json')}`
      const infile = `${dirPath}/${file}`
      const command = `firebase database:set -j -y ${dbPath} ${infile}`
      console.log(chalk.white(`Importing ${infile}...`))
      exec(command, (error, stdout, stderr) => {
        if (stdout) {
          console.log(chalk.white(`${file}: ${JSON.parse(stdout).status}`))
        }
      })
    }))
  })
}

module.exports = main
if (require.main === module) { main() }