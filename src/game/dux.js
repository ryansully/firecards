export const ActionTypes = {
  CURRENT_GAME_ERROR: 'game/CURRENT_GAME_ERROR',
  CURRENT_GAME_LOAD: 'game/CURRENT_GAME_LOAD',
  CURRENT_GAME_SYNC: 'game/CURRENT_GAME_SYNC',
  GAME_CREATE_ERROR: 'game/GAME_CREATE_ERROR',
  GAME_CREATE_REQUEST: 'game/GAME_CREATE_REQUEST',
  GAME_CREATE_SUCCESS: 'game/GAME_CREATE_SUCCESS',
  LAST_PLAYED_UPDATE: 'game/LAST_PLAYED_UPDATE',
  MY_GAMES_LOAD: 'game/MY_GAMES_LOAD',
  MY_GAMES_SYNC: 'game/MY_GAMES_SYNC',
}

export const actions = {
  createGameRequest: (newGame) => ({type: ActionTypes.GAME_CREATE_REQUEST, newGame}),
  createGameSuccess: (currentGame) => ({type: ActionTypes.GAME_CREATE_SUCCESS, currentGame}),
  createGameError: (gameCreateError) => ({type: ActionTypes.GAME_CREATE_ERROR, gameCreateError}),
  loadCurrentGame: (gameKey) => ({type: ActionTypes.CURRENT_GAME_LOAD, gameKey}),
  loadCurrentGameError: (currentGameError) => ({type: ActionTypes.CURRENT_GAME_ERROR, currentGameError}),
  loadMyGames: (authUser) => ({type: ActionTypes.MY_GAMES_LOAD, authUser}),
  syncCurrentGame: (currentGame) => ({type: ActionTypes.CURRENT_GAME_SYNC, currentGame}),
  syncMyGames: (myGames) => ({type: ActionTypes.MY_GAMES_SYNC, myGames}),
  updateLastPlayed: (authUid, gameKey) => ({type: ActionTypes.LAST_PLAYED_UPDATE, authUid, gameKey})
}

export const selectors = {
  getCurrentGame: (state) => state.game.currentGame,
  getCurrentGameError: (state) => state.game.currentGameError,
  getGameCreateError: (state) => state.game.gameCreateError,
  getMyGames: (state) => state.game.myGames,
  getMyGamesSortedByLastPlayedDesc: (state) => {
    // TODO: memoize this?
    return [...state.game.myGames].sort((a, b) => b.lastPlayedAt - a.lastPlayedAt)
  },
}

export const initialState = {
  currentGame: null,
  currentGameError: null,
  gameCreateError: null,
  myGames: [],
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
    case ActionTypes.MY_GAMES_SYNC:
      return {
        ...state,
        myGames: action.myGames
      }
    default:
      return state
  }
}