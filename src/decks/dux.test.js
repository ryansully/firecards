import reducer, { actions, ActionTypes, selectors, initialState } from './dux'

it('creates an action to fetch the deck index', () => {
  expect(actions.fetchDeckIndex()).toEqual({
    type: ActionTypes.DECK_INDEX_REQUEST
  })
})

it('creates an action to set the selected decks', () => {
  expect(actions.setSelectedDecks(['test'])).toEqual({
    type: ActionTypes.SELECTED_DECKS_SET,
    selectedDecks: ['test']
  })
})

it('creates an action to store the deck list', () => {
  expect(actions.storeDeckList({
    name: 'test'
  })).toEqual({
    type: ActionTypes.DECK_LIST_STORE,
    deckList: { name: 'test' }
  })
})

it('creates an action to store the deck order', () => {
  expect(actions.storeDeckOrder(['test1', 'test2'])).toEqual({
    type: ActionTypes.DECK_ORDER_STORE,
    deckOrder: ['test1', 'test2']
  })
})

it('creates an action to toggle all decks to be selected', () => {
  expect(actions.toggleAllSelected(null, {checked: true})).toEqual({
    type: ActionTypes.SELECT_ALL_TOGGLE,
    checked: true
  })
})

it('creates an action to toggle official decks to be selected', () => {
  expect(actions.toggleOfficialSelected(null, {checked: true})).toEqual({
    type: ActionTypes.SELECT_OFFICIAL_TOGGLE,
    checked: true
  })
})

it('creates an action to toggle a single deck to be selected', () => {
  const data = {
    checked: true,
    value: 'test'
  }
  expect(actions.toggleSelectedDeck(null, data)).toEqual({
    type: ActionTypes.SELECT_DECK_TOGGLE,
    ...data
  })
})

it('checks if deck list matches selected decks', () => {
  const state = {decks: {
    selectedDecks: ['deck1', 'deck2']
  }}
  const trueDecks = ['deck1', 'deck2']
  const lessDecks = ['deck1']
  const differentDecks = ['deck3', 'deck4']

  expect(selectors.areDecksSelected(state, null)).toEqual(false)
  expect(selectors.areDecksSelected(state, trueDecks)).toEqual(true)
  expect(selectors.areDecksSelected(state, lessDecks)).toEqual(false)
  expect(selectors.areDecksSelected(state, differentDecks)).toEqual(false)
})

it('selects deck list from state', () => {
  expect(selectors.getDeckList({decks: initialState})).toEqual(null)
})

it('selects deck order from state', () => {
  expect(selectors.getDeckOrder({decks: initialState})).toEqual(null)
})

it('selects official decks from state', () => {
  const officialDecks = selectors.getOfficialDecks({decks: {
    deckList: {deck1: {name: 'deck1'}, '[': {name: '['}},
    deckOrder: ['deck1', '[']
  }})
  expect(officialDecks.length).toEqual(1)
  expect(officialDecks[0]).toEqual('deck1')
})

it('selects selected decks from state', () => {
  expect(selectors.getSelectedDecks({decks: initialState})).toEqual(['Base'])
})

it('returns the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState)
})

it('handles SELECTED_DECKS_SET action', () => {
  expect(reducer({}, {
    type: ActionTypes.SELECTED_DECKS_SET,
    selectedDecks: ['test']
  })).toEqual({
    selectedDecks: ['test']
  })
})

it('handles DECK_LIST_STORE action', () => {
  expect(reducer({}, {
    type: ActionTypes.DECK_LIST_STORE,
    deckList: { name: 'test' }
  })).toEqual({
    deckList: { name: 'test' }
  })
})

it('handles DECK_ORDER_STORE action', () => {
  expect(reducer({}, {
    type: ActionTypes.DECK_ORDER_STORE,
    deckOrder: ['test1', 'test2']
  })).toEqual({
    deckOrder: ['test1', 'test2']
  })
})