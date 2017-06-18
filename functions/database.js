const functions = require('firebase-functions')

const setPlayerToGame = functions.database.ref('/users/{uid}/games/{game_key}')
  .onWrite((event) => {
    const uid = event.params.uid
    const gameKey = event.params.game_key
    const value = event.data.exists() ? event.data.val() : null

    const gamePlayersPath = `games/${gameKey}/players`
    return event.data.ref.root.child(gamePlayersPath).once('value')
      .then((snapshot) => {
        if (snapshot.child(uid).exists() && value) {
          snapshot.child(uid).ref.update(value)
        } else {
          return snapshot.ref.update({[uid]: value})
        }
      })
  })

const setUserAsAdmin = getUserFunction('admins', 'isAdmin', 'USER ADMIN SET')
const setUserAsGuest = getUserFunction('guests', 'isGuest', 'USER GUEST SET')

function getUser(event, uid) {
  return event.data.ref.root.child('users/' + uid).once('value')
}

function getUserFunction(path, value, logMessage) {
  return functions.database.ref(`/${path}/{uid}`)
    .onWrite((event) => {
      const uid = event.params.uid
      const values = {[value]: event.data.exists() || null}

      // set user flag
      return getUser(event, uid)
        .then((snapshot) => {
          // exit if user is not in database
          if (!snapshot.exists()) { return }

          console.log(logMessage, uid, values)
        return snapshot.ref.update(values)
        })
    })
}

module.exports = {
  setPlayerToGame,
  setUserAsAdmin,
  setUserAsGuest,
}