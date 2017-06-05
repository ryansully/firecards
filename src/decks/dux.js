export const ActionTypes = {
  DECK_INDEX_REQUEST: 'decks/DECK_INDEX_REQUEST',
  SELECT_ALL_TOGGLE: 'decks/SELECT_ALL_TOGGLE',
  SELECT_DECK_TOGGLE: 'decks/SELECT_DECK_TOGGLE',
  SELECT_OFFICIAL_TOGGLE: 'decks/SELECT_OFFICIAL_TOGGLE',
  SET_SELECTED_DECKS: 'decks/SET_SELECTED_DECKS',
  STORE_DECK_LIST: 'decks/STORE_DECK_LIST',
  STORE_DECK_ORDER: 'decks/STORE_DECK_ORDER',
}

export const actions = {
  fetchDeckIndex: () => ({type: ActionTypes.DECK_INDEX_REQUEST}),
  setSelectedDecks: (selectedDecks) => ({type: ActionTypes.SET_SELECTED_DECKS, selectedDecks}),
  storeDeckList: (deckList) => ({type: ActionTypes.STORE_DECK_LIST, deckList}),
  storeDeckOrder: (deckOrder) => ({type: ActionTypes.STORE_DECK_ORDER, deckOrder}),
  toggleAllSelected: (event, data) => ({type: ActionTypes.SELECT_ALL_TOGGLE, checked: data.checked}),
  toggleOfficialSelected: (event, data) => ({type: ActionTypes.SELECT_OFFICIAL_TOGGLE, checked: data.checked}),
  toggleSelectedDeck: (event, data) => ({type: ActionTypes.SELECT_DECK_TOGGLE, checked: data.checked, value: data.value}),
}

export const selectors = {
  areDecksSelected: (state, decks) => {
    const { selectedDecks } = state.decks
    if (selectedDecks.length !== decks.length) { return false }
    // this is O(n^2), but the arrays are small and fixed
    return decks.every(deck => selectedDecks.includes(deck))
  },
  getDeckList: (state) => state.decks.deckList,
  getDeckOrder: (state) => state.decks.deckOrder,
  getOfficialDecks: (state) => (state.decks.deckOrder || [])
    .filter((deck) => state.decks.deckList[deck].name[0] !== '['),
  getSelectedDecks: (state) => state.decks.selectedDecks,
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