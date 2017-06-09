import { all, call, fork, put, take, takeEvery } from 'redux-saga/effects'
import { reduxSagaFirebase } from '../firebase'
import { actions, ActionTypes } from './dux'

export function* signOut() {
  // sign out user from Firebase
  yield call(reduxSagaFirebase.logout)
}

export function* watchAuthStateChange() {
  const channel = yield call(reduxSagaFirebase.authChannel)

  while (true) {
    const { user } = yield take(channel)
    yield put(actions.syncAuthUser(user))
  }
}

export const sagas = {
  signOut,
  watchAuthStateChange,
}

export default function* root() {
  yield all([
    fork(sagas.watchAuthStateChange),
    takeEvery(ActionTypes.SIGN_OUT, sagas.signOut),
  ])
}