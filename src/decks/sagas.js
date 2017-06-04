import { all, call, fork, put, take } from 'redux-saga/effects'
import { actions, ActionTypes } from './dux'
import { app, FirebaseSagaHelper } from '../firebase'

const helper = new FirebaseSagaHelper(app)

export function* getDeckIndex() {
  while (true) {
    yield take(ActionTypes.DECK_INDEX_REQUEST)
    const deckIndex = yield call(helper.get, '/decks/!index')
    const { '!order': deckOrder, ...deckList } = deckIndex
    yield put(actions.storeDeckList(deckList))
    yield put(actions.storeDeckOrder(deckOrder))
  }
}

export default function* root() {
  yield all([
    fork(getDeckIndex),
  ])
}