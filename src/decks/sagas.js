import { all, call, fork, put, select, take } from 'redux-saga/effects'
import { actions, ActionTypes, selectors } from './dux'
import { reduxSagaFirebase } from '../firebase'

function* getDeckIndex() {
  while (true) {
    yield take(ActionTypes.DECK_INDEX_REQUEST)
    const deckIndex = yield call(reduxSagaFirebase.get, '/decks/!index')
    const { '!order': deckOrder, ...deckList } = deckIndex
    yield put(actions.storeDeckList(deckList))
    yield put(actions.storeDeckOrder(deckOrder))
  }
}

function* setSelectedDecks(decks) {
  yield put(actions.setSelectedDecks(decks))
}

function* toggleAllSelected() {
  while (true) {
    const action = yield take(ActionTypes.SELECT_ALL_TOGGLE)
    const decks = yield select(selectors.getDeckOrder)
    yield call(setSelectedDecks, action.checked ? decks : [])
  }
}

function* toggleOfficialSelected() {
  while (true) {
    const action = yield take(ActionTypes.SELECT_OFFICIAL_TOGGLE)
    const decks = yield select(selectors.getOfficialDecks)
    yield call(setSelectedDecks, action.checked ? decks : [])
  }
}

function* toggleSelectedDeck() {
  while (true) {
    const action = yield take(ActionTypes.SELECT_DECK_TOGGLE)
    const selectedDecks = yield select(selectors.getSelectedDecks)
    if (action.checked) {
      const deckOrder = yield select(selectors.getDeckOrder)

      // add deck according to deck order
      yield call(setSelectedDecks, deckOrder.reduce((a, b) => {
        // push deck to new array if it exists in the previous array
        if (selectedDecks.includes(b)) { a.push(b) }
        // push new deck to array
        if (action.value === b) { a.push(b) }
        return a
      }, []))
    } else {
      // remove deck from selected list
      yield call(setSelectedDecks, selectedDecks.filter(id => id !== action.value))
    }
  }
}

export const sagas = {
  getDeckIndex,
  setSelectedDecks,
  toggleAllSelected,
  toggleOfficialSelected,
  toggleSelectedDeck,
}

export default function* root() {
  yield all([
    fork(sagas.getDeckIndex),
    fork(sagas.toggleAllSelected),
    fork(sagas.toggleOfficialSelected),
    fork(sagas.toggleSelectedDeck),
  ])
}