export const ActionTypes = {
  CURRENT_GAME_ERROR: 'game/CURRENT_GAME_ERROR',
  CURRENT_GAME_LOAD: 'game/CURRENT_GAME_LOAD',
  CURRENT_GAME_SYNC: 'game/CURRENT_GAME_SYNC',
  GAME_CREATE_ERROR: 'game/GAME_CREATE_ERROR',
  GAME_CREATE_REQUEST: 'game/GAME_CREATE_REQUEST',
  GAME_CREATE_SUCCESS: 'game/GAME_CREATE_SUCCESS',
  GAME_CREATE_ERROR: 'game/GAME_CREATE_ERROR',
}

export const actions = {
  closeCurrentGame: () => ({type: ActionTypes.CURRENT_GAME_CLOSE}),
  createGameRequest: (newGame) => ({type: ActionTypes.GAME_CREATE_REQUEST, newGame}),
  createGameSuccess: (currentGame) => ({type: ActionTypes.GAME_CREATE_SUCCESS, currentGame}),
  createGameError: (gameCreateError) => ({type: ActionTypes.GAME_CREATE_ERROR, gameCreateError}),
  loadCurrentGame: (gameKey) => ({type: ActionTypes.CURRENT_GAME_LOAD, gameKey}),
  loadCurrentGameError: (currentGameError) => ({type: ActionTypes.CURRENT_GAME_ERROR, currentGameError}),
  syncCurrentGame: (currentGame) => ({type: ActionTypes.CURRENT_GAME_SYNC, currentGame}),
}

export const selectors = {
  getGameCreateError: (state) => state.game.gameCreateError,
  getCurrentGame: (state) => state.game.currentGame,
  getCurrentGameError: (state) => state.game.currentGameError,
  getGameCreateError: (state) => state.game.gameCreateError,
}

export const initialState = {
  currentGame: null,
  currentGameError: null,
  gameCreateError: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CURRENT_GAME_LOAD:
    case ActionTypes.CURRENT_GAME_SYNC:
    case ActionTypes.GAME_CREATE_SUCCESS:
      return {
        ...state,
        currentGame: action.currentGame
      }
    case ActionTypes.CURRENT_GAME_ERROR:
      return {
        ...state,
        currentGameError: action.currentGameError
      }
    case ActionTypes.GAME_CREATE_ERROR:
      return {
        ...state,
        gameCreateError: action.gameCreateError
      }
    default:
      return state
  }
}