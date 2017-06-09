const functions = require('firebase-functions')

const setUserAsAdmin = functions.database.ref('/admins/{uid}')
  .onWrite((event) => {
    const uid = event.params.uid
    const isAdmin = event.data.exists() || null

    // set user as admin or remove admin flag if uid is deleted from /admins
    return event.data.ref.root.child('users/' + uid).once('value')
      .then((snapshot) => {
        // exit if user is not in database
        if (!snapshot.exists()) { return }

        console.log('SET USER AS ADMIN', uid, isAdmin)
        return snapshot.ref.update({isAdmin})
      })
  })

const setUserAsGuest = functions.database.ref('/guests/{uid}')
  .onWrite((event) => {
    const uid = event.params.uid
    const isGuest = event.data.exists() || null

    // set user as guest or remove guest flag if uid is deleted from /guests
    return event.data.ref.root.child('users/' + uid).once('value')
      .then((snapshot) => {
        // exit if user is not in database
        if (!snapshot.exists()) { return }

        console.log('SET USER AS GUEST', uid, isGuest)
        return snapshot.ref.update({isGuest})
      })
  })

module.exports = {
  setUserAsAdmin,
  setUserAsGuest,
}