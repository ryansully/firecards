import { all, call, put, take, takeEvery } from 'redux-saga/effects'
import { reduxSagaFirebase } from '../firebase'
import { actions } from './dux'
import { ActionTypes as authActionTypes } from '../auth/dux'

export const channels = {
  currentUser: null,
}

export function* closeCurrentUser() {
  if (channels.currentUser) {
    channels.currentUser.close()
    yield put(actions.syncCurrentUser(null))
  }
}

export function* watchCurrentUser(action) {
  const { authUser } = action

  if (authUser) {
    const path = 'users/' + authUser.uid
    channels.currentUser = yield call(reduxSagaFirebase.channel, path)

    while (true) {
      const currentUser = yield take(channels.currentUser)
      yield put(actions.syncCurrentUser(currentUser))
    }
  } else {
    yield call(sagas.closeCurrentUser)
  }
}

export const sagas = {
  closeCurrentUser,
  watchCurrentUser,
}

export default function* root() {
  yield all([
    takeEvery(authActionTypes.AUTH_USER_SYNC, sagas.watchCurrentUser),
  ])
}