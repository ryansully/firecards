const functions = require('firebase-functions')

const setGameToUser = functions.database.ref('/games/{game_key}')
  .onWrite((event) => {
    const gameKey = event.params.game_key
    const game = event.data.val() || event.data.previous.val()
    const uid = game.host
    const value = event.data.exists() || null

    return getUser(event, uid)
      .then((snapshot) => {
        // exit if user is not in database
        if (!snapshot.exists()) { return }

        // exit if game is already set to user and game is not deleted
        if (snapshot.hasChild('games/' + gameKey) && value) { return }

        console.log('USER GAME SET', uid, game)
        return snapshot.ref.child('games').update({[gameKey]: value})
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
  setGameToUser,
  setUserAsAdmin,
  setUserAsGuest,
}