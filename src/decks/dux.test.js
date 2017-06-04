import reducer, { actions, ActionTypes, selectors, initialState } from './dux'

it('creates an action to fetch the deck index', () => {
  expect(actions.fetchDeckIndex()).toEqual({
    type: ActionTypes.DECK_INDEX_REQUEST
  })
})

it('creates an action to set the selected decks', () => {
  expect(actions.setSelectedDecks(['test'])).toEqual({
    type: ActionTypes.SET_SELECTED_DECKS,
    selectedDecks: ['test']
  })
})

it('creates an action to store the deck list', () => {
  expect(actions.storeDeckList({
    name: 'test'
  })).toEqual({
    type: ActionTypes.STORE_DECK_LIST,
    deckList: { name: 'test' }
  })
})

it('creates an action to store the deck order', () => {
  expect(actions.storeDeckOrder(['test1', 'test2'])).toEqual({
    type: ActionTypes.STORE_DECK_ORDER,
    deckOrder: ['test1', 'test2']
  })
})

it('selects deck list from state', () => {
  expect(selectors.getDeckList({decks: initialState})).toEqual(null)
})

it('selects deck order from state', () => {
  expect(selectors.getDeckOrder({decks: initialState})).toEqual(null)
})

it('selects selected decks from state', () => {
  expect(selectors.getSelectedDecks({decks: initialState})).toEqual(['Base'])
})

it('returns the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState)
})

it('handles SET_SELECTED_DECKS action', () => {
  expect(reducer({}, {
    type: ActionTypes.SET_SELECTED_DECKS,
    selectedDecks: ['test']
  })).toEqual({
    selectedDecks: ['test']
  })
})

it('handles STORE_DECK_LIST action', () => {
  expect(reducer({}, {
    type: ActionTypes.STORE_DECK_LIST,
    deckList: { name: 'test' }
  })).toEqual({
    deckList: { name: 'test' }
  })
})

it('handles STORE_DECK_ORDER action', () => {
  expect(reducer({}, {
    type: ActionTypes.STORE_DECK_ORDER,
    deckOrder: ['test1', 'test2']
  })).toEqual({
    deckOrder: ['test1', 'test2']
  })
})