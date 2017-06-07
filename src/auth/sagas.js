import { all, call, fork, put, select, take } from 'redux-saga/effects'
import { reduxSagaFirebase } from '../firebase'
import { actions, ActionTypes, selectors } from './dux'

export function* authUser() {
  while (true) {
    const action = yield take(ActionTypes.AUTH_USER_REQUEST)
    yield put(actions.authUserSuccess(action.user))
  }
}

export function* signOut() {
  while (true) {
    yield take(ActionTypes.SIGN_OUT_REQUEST)
    yield call(reduxSagaFirebase.logout)
    yield put(actions.signOutSuccess())
  }
}

export function* watchAuthStateChange() {
  const channel = yield call(reduxSagaFirebase.authChannel)

  while (true) {
    const { user } = yield take(channel)
    const storedUser = yield select(selectors.getUser)
    if (user) {
      if (!storedUser) { yield put(actions.authUserRequest(user)) }
    } else {
      if (storedUser) { yield put(actions.signOutRequest()) }
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
    fork(sagas.authUser),
    fork(sagas.signOut),
    fork(sagas.watchAuthStateChange),
  ])
}