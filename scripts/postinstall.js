// don't run postinstall in CI
process.env.CI && process.exit()

const execSync = require('child_process').execSync
const execSyncOptions = { stdio: 'inherit' }

execSync('firebase login', execSyncOptions)
execSync('firebase use --add', execSyncOptions)
require('./importDecks')()
require('./writeEnv')()