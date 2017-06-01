export const ActionTypes = {
  GET_DECK_INDEX: 'decks/GET_DECK_INDEX',
  SET_SELECTED_DECKS: 'decks/SET_SELECTED_DECKS',
  STORE_DECK_LIST: 'decks/STORE_DECK_LIST',
  STORE_DECK_ORDER: 'decks/STORE_DECK_ORDER',
}

export const actions = {
  getDeckIndex: () => ({type: ActionTypes.GET_DECK_INDEX}),
  setSelectedDecks: (selectedDecks) => ({type: ActionTypes.SET_SELECTED_DECKS, selectedDecks}),
  storeDeckList: (deckList) => ({type: ActionTypes.STORE_DECK_LIST, deckList}),
  storeDeckOrder: (deckOrder) => ({type: ActionTypes.STORE_DECK_ORDER, deckOrder}),
}

export const initialState = {
  deckList: null,
  deckOrder: null,
  selectedDecks: ['Base'],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_SELECTED_DECKS:
      return {
        ...state,
        selectedDecks: action.selectedDecks
      }
    case ActionTypes.STORE_DECK_LIST:
      return {
        ...state,
        deckList: action.deckList
      }
    case ActionTypes.STORE_DECK_ORDER:
      return {
        ...state,
        deckOrder: action.deckOrder
      }
    default:
      return state
  }
}