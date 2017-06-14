import { all, call, fork, put, select, take } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import { reduxSagaFirebase } from '../firebase'
import { actions, ActionTypes, selectors } from './dux'
import root, { sagas } from './sagas'

describe('getDeckIndex saga', () => {
  const generator = sagas.getDeckIndex()

  it('waits for deck index requests', () => {
    expect(generator.next().value).toEqual(take(ActionTypes.DECK_INDEX_REQUEST))
  })

  const path = '/decks/!index'

  it('gets a deck index from the database', () => {
    expect(generator.next().value)
      .toEqual(call(reduxSagaFirebase.database.read, path))
  })

  it('dispatches an action that stores a deck list', () => {
    expect(generator.next({}).value).toEqual(put(actions.storeDeckList({})))
  })

  it('dispatches an action that stores a deck order', () => {
    expect(generator.next().value).toEqual(put(actions.storeDeckOrder()))
  })
})

describe('setSelectedDecks saga', function () {
  const decks = ['test1', 'test2']
  const generator = sagas.setSelectedDecks(decks)

  it('dispatches an action that sets selected decks', () => {
    expect(generator.next().value).toEqual(put(actions.setSelectedDecks(decks)))
  })
})

describe('toggleAllSelected saga', function () {
  const state = {decks: {deckOrder: ['test1', 'test2']}}
  const decks = selectors.getDeckOrder(state)
  const data = {}
  data.gen = cloneableGenerator(sagas.toggleAllSelected)()

  it('waits for action to toggle all decks to be selected', () => {
    expect(data.gen.next().value).toEqual(take(ActionTypes.SELECT_ALL_TOGGLE))
  })

  const checkedAction = actions.toggleAllSelected(null, {checked: true})
  const uncheckedAction = actions.toggleAllSelected(null, {checked: false})

  it('selects deck order from state', () => {
    data.clone = data.gen.clone()
    expect(data.gen.next(checkedAction).value)
      .toEqual(select(selectors.getDeckOrder))
    expect(data.clone.next(uncheckedAction).value)
      .toEqual(select(selectors.getDeckOrder))
  })

  it('calls setSelectedDecks saga with checked value', () => {
    expect(data.gen.next(decks).value)
      .toEqual(call(sagas.setSelectedDecks, decks))
  })

  it('calls setSelectedDecks saga with unchecked value', () => {
    expect(data.clone.next(decks).value)
      .toEqual(call(sagas.setSelectedDecks, []))
  })
})

describe('toggleOfficialSelected saga', function () {
  const state = {decks: {
    deckList: {deck1: {name: 'deck1'}, '[': {name: '['}},
    deckOrder: ['deck1', '[']
  }}
  const decks = selectors.getOfficialDecks(state)
  const data = {}
  data.gen = cloneableGenerator(sagas.toggleOfficialSelected)()

  it('waits for action to toggle official decks to be selected', () => {
    expect(data.gen.next().value)
      .toEqual(take(ActionTypes.SELECT_OFFICIAL_TOGGLE))
  })

  const checkedAction = actions.toggleOfficialSelected(null, {checked: true})
  const uncheckedAction = actions.toggleOfficialSelected(null, {checked: false})

  it('selects official decks from state', () => {
    data.unchecked = data.gen.clone()
    expect(data.gen.next(checkedAction).value)
      .toEqual(select(selectors.getOfficialDecks))
    expect(data.unchecked.next(uncheckedAction).value)
      .toEqual(select(selectors.getOfficialDecks))
  })

  it('calls setSelectedDecks saga with checked value', () => {
    expect(data.gen.next(decks).value)
      .toEqual(call(sagas.setSelectedDecks, decks))
  })

  it('calls setSelectedDecks saga with unchecked value', () => {
    expect(data.unchecked.next(decks).value)
      .toEqual(call(sagas.setSelectedDecks, []))
  })
})

describe('toggleSelectedDeck saga', function () {
  const data = {}
  data.gen = cloneableGenerator(sagas.toggleSelectedDeck)()

  it('waits for action to toggle a single deck to be selected', () => {
    expect(data.gen.next().value).toEqual(take(ActionTypes.SELECT_DECK_TOGGLE))
  })

  const checkedAction = actions.toggleSelectedDeck(null, {
    checked: true,
    value: 'deck2'
  })
  const uncheckedAction = actions.toggleSelectedDeck(null, {
    checked: false,
    value: 'deck2'
  })

  it('selects selected decks from state', () => {
    data.unchecked = data.gen.clone()
    expect(data.gen.next(checkedAction).value)
      .toEqual(select(selectors.getSelectedDecks))
    expect(data.unchecked.next(uncheckedAction).value)
      .toEqual(select(selectors.getSelectedDecks))
  })

  it('removes deck from selected list with unchecked value', () => {
    const nextValue = data.unchecked.next(['deck1', 'deck2']).value
    expect(nextValue.CALL.args).toEqual([['deck1']])
    expect(nextValue.CALL.fn).toEqual(sagas.setSelectedDecks)
  })

  it('selects deck order from state with checked value', () => {
    expect(data.gen.next(['deck1']).value)
      .toEqual(select(selectors.getDeckOrder))
  })

  const deckOrder = ['deck1', 'deck2']

  it('adds deck according to deck order', () => {
    expect(data.gen.next(deckOrder).value)
      .toEqual(call(sagas.setSelectedDecks, deckOrder))
  })
})

describe('root saga', () => {
  const generator = root()

  it('yields an array of sagas', () => {
    expect(generator.next().value).toEqual(all([
      fork(sagas.getDeckIndex),
      fork(sagas.toggleAllSelected),
      fork(sagas.toggleOfficialSelected),
      fork(sagas.toggleSelectedDeck),
    ]))
  })
})