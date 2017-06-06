const functions = require('firebase-functions')

module.exports = (admin) => {
  const addAuthUserToDatabase = functions.auth.user().onCreate((event) => {
    const user = event.data

    return admin.database().ref('admins').once('value')
      .then((snapshot) => {
        // is user an admin?
        console.log('Checking /admins...')
        if (user.providerData[0].uid in snapshot.val()) {
          // add matching providerUid to /admins
          console.log('DB ADMIN ADD', user.uid)
          return snapshot.ref.update({[user.uid]: true})
        } else {
          // is user an invited guest?
          console.log('Checking /guests...')
          return admin.database().ref('guests').once('value')
        }
      })
      .then((snapshot) => {
        // snapshot is falsy if user is an admin (from the previous step)
        if (!snapshot || (snapshot.val() && user.email in snapshot.val())) {
          // add user to database if admin or invited guest
          return addUserToDatabase(user)
        } else {
          // user was not invited, so delete user
          console.log('AUTH USER DELETE', user)
          return admin.auth().deleteUser(user.uid)
        }
      })
  })

  const removeUserFromDatabase = functions.auth.user().onDelete((event) => {
    const user = event.data

    // remove the user from /users and /admins
    console.log('DB USER DELETE', user)
    const db = admin.database()
    db.ref('/users/' + user.uid).remove()
    db.ref('/admins/' + user.uid).remove()
  })

  function addUserToDatabase(user) {
    // add user to /users
    console.log('DB USER ADD', user)
    return admin.database().ref('users/' + user.uid).set({
      displayName: user.displayName,
      photoURL: user.photoURL,
      providerUid: user.providerData[0].uid,
    })
  }

  return {
    addAuthUserToDatabase,
    removeUserFromDatabase,
  }
}