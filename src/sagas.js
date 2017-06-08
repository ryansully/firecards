import { all, fork } from 'redux-saga/effects'
import authSagas from './auth/sagas'
import decksSagas from './decks/sagas'
import gameSagas from './game/sagas'
import userSagas from './user/sagas'

export default function* rootSaga() {
  yield all([
    fork(authSagas),
    fork(decksSagas),
    fork(gameSagas),
    fork(userSagas),
  ])
}