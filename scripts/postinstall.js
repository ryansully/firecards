// don't run postinstall in CI
if (process.env.CI) {
  process.exit()
}

const execSync = require('child_process').execSync
const execSyncOptions = { stdio: 'inherit' }

execSync('firebase login', execSyncOptions)
execSync('firebase use --add', execSyncOptions)
require('./importAdmins')()
require('./importDecks')()
require('./writeEnv')()