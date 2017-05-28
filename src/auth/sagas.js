import { all, call, fork, put, take } from 'redux-saga/effects'
import auth from './index'
import { actions, ActionTypes } from './dux'

export function* authUser() {
  while (true) {
    const action = yield take(ActionTypes.AUTH_USER_REQUEST)
    yield put(actions.authUserSuccess(action.user))
  }
}

export function* signOut() {
  while (true) {
    yield take(ActionTypes.SIGN_OUT_REQUEST)
    yield call([auth, auth.signOut])
    yield put(actions.signOutSuccess())
  }
}

export default function* root() {
  yield all([
    fork(authUser),
    fork(signOut),
  ])
}