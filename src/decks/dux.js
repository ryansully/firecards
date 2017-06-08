export const ActionTypes = {
  DECK_INDEX_REQUEST: 'decks/DECK_INDEX_REQUEST',
  SELECT_ALL_TOGGLE: 'decks/SELECT_ALL_TOGGLE',
  SELECT_DECK_TOGGLE: 'decks/SELECT_DECK_TOGGLE',
  SELECT_OFFICIAL_TOGGLE: 'decks/SELECT_OFFICIAL_TOGGLE',
  SELECTED_DECKS_SET: 'decks/SELECTED_DECKS_SET',
  DECK_LIST_STORE: 'decks/DECK_LIST_STORE',
  DECK_ORDER_STORE: 'decks/DECK_ORDER_STORE',
}

export const actions = {
  fetchDeckIndex: () => ({type: ActionTypes.DECK_INDEX_REQUEST}),
  setSelectedDecks: (selectedDecks) => ({type: ActionTypes.SELECTED_DECKS_SET, selectedDecks}),
  storeDeckList: (deckList) => ({type: ActionTypes.DECK_LIST_STORE, deckList}),
  storeDeckOrder: (deckOrder) => ({type: ActionTypes.DECK_ORDER_STORE, deckOrder}),
  toggleAllSelected: (event, data) => ({type: ActionTypes.SELECT_ALL_TOGGLE, checked: data.checked}),
  toggleOfficialSelected: (event, data) => ({type: ActionTypes.SELECT_OFFICIAL_TOGGLE, checked: data.checked}),
  toggleSelectedDeck: (event, data) => ({type: ActionTypes.SELECT_DECK_TOGGLE, checked: data.checked, value: data.value}),
}

export const selectors = {
  areDecksSelected: (state, decks) => {
    const { selectedDecks } = state.decks
    if (!decks) { return false }
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
    case ActionTypes.SELECTED_DECKS_SET:
      return {
        ...state,
        selectedDecks: action.selectedDecks
      }
    case ActionTypes.DECK_LIST_STORE:
      return {
        ...state,
        deckList: action.deckList
      }
    case ActionTypes.DECK_ORDER_STORE:
      return {
        ...state,
        deckOrder: action.deckOrder
      }
    default:
      return state
  }
}