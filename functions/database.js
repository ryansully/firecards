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

        console.log('USER GAME SET', uid, game)
        return snapshot.ref.child('games').update({[gameKey]: value})
      })
  })

const setUserAsAdmin = functions.database.ref('/admins/{uid}')
  .onWrite((event) => {
    const uid = event.params.uid
    const isAdmin = event.data.exists() || null

    // set user as admin or remove admin flag if uid is deleted from /admins
    return getUser(event, uid)
      .then((snapshot) => {
        // exit if user is not in database
        if (!snapshot.exists()) { return }

        console.log('USER ADMIN SET', uid, isAdmin)
        return snapshot.ref.update({isAdmin})
      })
  })

const setUserAsGuest = functions.database.ref('/guests/{uid}')
  .onWrite((event) => {
    const uid = event.params.uid
    const isGuest = event.data.exists() || null

    // set user as guest or remove guest flag if uid is deleted from /guests
    return getUser(event, uid)
      .then((snapshot) => {
        // exit if user is not in database
        if (!snapshot.exists()) { return }

        console.log('USER GUEST SET', uid, isGuest)
        return snapshot.ref.update({isGuest})
      })
  })

function getUser(event, uid) {
  return event.data.ref.root.child('users/' + uid).once('value')
}

module.exports = {
  setGameToUser,
  setUserAsAdmin,
  setUserAsGuest,
}