// add project owner as admin to Firebase database
const Configstore = require('configstore')
const chalk = require('chalk')
const client = require('firebase-tools')

const dbPath = '/admins'

function main() {
  const configstore = new Configstore('firebase-tools')
  const user = configstore.get('user')
  console.log(chalk.white('Adding project owner as admin to database...'))
  client.database.set(dbPath, null, {
    data: JSON.stringify({[user.sub]: 'true'}),
    confirm: true
  })
}

module.exports = main
if (require.main === module) { main() }