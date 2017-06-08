const functions = require('firebase-functions')
const admin = require('./admin')
const { addAuthUserToDatabase, removeUserFromDatabase } = require('./auth')(admin)
const { setUserAsAdmin } = require('./database')

const nodeVersions = functions.https.onRequest((req, res) => {
  res.send(process.versions)
})

module.exports = {
  addAuthUserToDatabase,
  nodeVersions,
  removeUserFromDatabase,
  setUserAsAdmin,
}