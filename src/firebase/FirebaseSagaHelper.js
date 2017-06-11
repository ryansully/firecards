import database from './database'

export default class FirebaseSagaHelper {
  constructor(firebaseApp) {
    this.app = firebaseApp

    this.channel = database.channel.bind(this)
  }
}