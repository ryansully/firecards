import { all, call, fork, put, select, take } from 'redux-saga/effects'
import { reduxSagaFirebase } from '../firebase'
import { actions, ActionTypes, selectors } from './dux'

export function* authUser() {
  while (true) {
    const action = yield take(ActionTypes.AUTH_USER_REQUEST)

    // dispatch action only if user is not already stored
    const user = yield select(selectors.getUser)
    if (!user) {
      yield put(actions.authUserSuccess(action.user))
    }
  }
}

export function* signOut() {
  while (true) {
    yield take(ActionTypes.SIGN_OUT_REQUEST)

    // sign out user from Firebase
    yield call(reduxSagaFirebase.logout)

    // dispatch action only if user is already stored
    const user = yield select(selectors.getUser)
    if (user) {
      yield put(actions.signOutSuccess())
    }
  }
}

export function* watchAuthStateChange() {
  const channel = yield call(reduxSagaFirebase.authChannel)

  while (true) {
    const { user } = yield take(channel)
    if (user) {
      yield put(actions.authUserRequest(user))
    } else {
      yield put(actions.signOutRequest())
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