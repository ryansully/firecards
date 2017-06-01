import { call } from 'redux-saga/effects'

export function* get(path) {
  const ref = this.ref(path)
  const snapshot = yield call([ref, ref.once], 'value')
  return snapshot.val()
}