const functions = require('firebase-functions')

module.exports = (admin) => {
  const addAuthUserToDatabase = functions.auth.user().onCreate((event) => {
    const user = event.data

    return admin.database().ref('admins').once('value')
      .then((snapshot) => {
        const providerUid = user.providerData[0].uid
        const isAdmin = snapshot.child(providerUid).exists() || null

        // is user an admin?
        console.log('Checking /admins...')
        if (isAdmin) {
          // add matching providerUid to /admins
          console.log('DB ADMIN ADD', user)
          snapshot.ref.update({[user.uid]: true})
        }

        // add user to /users
        console.log('DB USER ADD', user)
        return admin.database().ref('users/' + user.uid).set({
          displayName: user.displayName,
          photoURL: user.photoURL,
          providerUid,
          isAdmin,
        })
      })
  })

  const removeUserFromDatabase = functions.auth.user().onDelete((event) => {
    const user = event.data

    // remove the user from /users and /admins
    console.log('DB USER DELETE', user)
    const db = admin.database()
    db.ref('/users/' + user.uid).remove()
    db.ref('/guests/' + user.uid).remove()
    db.ref('/admins/' + user.uid).remove()
  })

  return {
    addAuthUserToDatabase,
    removeUserFromDatabase,
  }
}