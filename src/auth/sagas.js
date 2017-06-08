import { all, call, fork, put, select, take, takeEvery } from 'redux-saga/effects'
import { reduxSagaFirebase } from '../firebase'
import { actions, ActionTypes, selectors } from './dux'

export function* authUser(action) {
  // dispatch action only if user is not already stored
  const user = yield select(selectors.getUser)
  if (!user) {
    yield put(actions.authUserSuccess(action.user))
  }
}

export function* signOut() {
  // sign out user from Firebase
  yield call(reduxSagaFirebase.logout)

  // dispatch action only if user is already stored
  const user = yield select(selectors.getUser)
  if (user) {
    yield put(actions.signOutSuccess())
  }
}

export function* watchAuthStateChange() {
  const channel = yield call(reduxSagaFirebase.authChannel)

  while (true) {
    const { user } = yield take(channel)
    if (user) {
      yield call(sagas.authUser, {user})
    } else {
      yield call(sagas.signOut)
    }
  }
}

export const sagas = {
  authUser,
  signOut,
  watchAuthStateChange,
}

export default function* root() {
  yield all([
    takeEvery(ActionTypes.AUTH_USER_REQUEST, sagas.authUser),
    takeEvery(ActionTypes.SIGN_OUT_REQUEST, sagas.signOut),
    fork(sagas.watchAuthStateChange),
  ])
}