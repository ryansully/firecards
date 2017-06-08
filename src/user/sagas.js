import { all, call, fork, put, select, take, takeEvery } from 'redux-saga/effects'
import { reduxSagaFirebase } from '../firebase'
import { actions } from './dux'
import { ActionTypes as authActionTypes, selectors as authSelectors } from '../auth/dux'

export function* watchUser() {
  const authUser = yield select(authSelectors.getUser)
  if (!authUser) { return }
  const channel = yield call(reduxSagaFirebase.channel, 'users/' + authUser.uid)

  while (true) {
    const user = yield take(channel)
    yield put(actions.getUserSuccess(user))
  }
}

export const sagas = {
  watchUser,
}

export default function* root() {
  yield all([
    fork(sagas.watchUser),
    takeEvery(authActionTypes.AUTH_USER_SUCCESS, sagas.watchUser),
  ])
}