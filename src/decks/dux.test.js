import reducer, { actions, ActionTypes, initialState } from './dux'

it('returns the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState)
})

it('creates an action to get the deck index', () => {
  expect(actions.getDeckIndex()).toEqual({
    type: ActionTypes.GET_DECK_INDEX
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