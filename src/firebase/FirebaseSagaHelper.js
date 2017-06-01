import * as database from './database'

export default class FirebaseSagaHelper {
  constructor(firebaseApp) {
    this.app = firebaseApp
    this.auth = this.app.auth()
    this.database = this.app.database()

    this.get = database.get.bind(this.database)
  }
}