import reducer, { actions, ActionTypes, selectors, initialState } from './dux'

const gameKey = 'game_key'
const currentGame = {gameKey}
const error = Error('test')
const currentGameError = error
const gameCreateError = error
const myGames = []

it('creates action to request a created game', () => {
  const newGame = {name: 'test'}
  expect(actions.createGameRequest(newGame)).toEqual({
    type: ActionTypes.GAME_CREATE_REQUEST,
    newGame
  })
})

it('creates action to store a newly created game', () => {
  expect(actions.createGameSuccess(currentGame)).toEqual({
    type: ActionTypes.GAME_CREATE_SUCCESS,
    currentGame
  })
})

it('creates action to handle game creation error', () => {
  expect(actions.createGameError(error)).toEqual({
    type: ActionTypes.GAME_CREATE_ERROR,
    gameCreateError
  })
})

it('creates action to load a game', () => {
  expect(actions.loadCurrentGame(gameKey)).toEqual({
    type: ActionTypes.CURRENT_GAME_LOAD,
    gameKey
  })
})

it('creates action to handle game load error', () => {
  expect(actions.loadCurrentGameError(error)).toEqual({
    type: ActionTypes.CURRENT_GAME_ERROR,
    currentGameError
  })
})

it('creates action to load my games', () => {
  const authUser = {uid: 'uid'}
  expect(actions.loadMyGames(authUser)).toEqual({
    type: ActionTypes.MY_GAMES_LOAD,
    authUser
  })
})

it('creates action to sync the current game', () => {
  expect(actions.syncCurrentGame(currentGame)).toEqual({
    type: ActionTypes.CURRENT_GAME_SYNC,
    currentGame
  })
})

it('creates action to sync my games', () => {
  expect(actions.syncMyGames(myGames)).toEqual({
    type: ActionTypes.MY_GAMES_SYNC,
    myGames
  })
})

it('selects current game from state', () => {
  expect(selectors.getCurrentGame({game: initialState})).toEqual(null)
})

it('selects current game error from state', () => {
  expect(selectors.getCurrentGameError({game: initialState})).toEqual(null)
})

it('selects game create error from state', () => {
  expect(selectors.getGameCreateError({game: initialState})).toEqual(null)
})

it('selects my games from state', () => {
  expect(selectors.getMyGames({game: initialState})).toEqual([])
})

it('returns the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState)
})

it('handles CURRENT_GAME_LOAD action', () => {
  expect(reducer({}, {
    type: ActionTypes.CURRENT_GAME_LOAD,
    currentGame
  })).toEqual({currentGame})
})

it('handles CURRENT_GAME_SYNC action', () => {
  expect(reducer({}, {
    type: ActionTypes.CURRENT_GAME_SYNC,
    currentGame
  })).toEqual({currentGame})
})

it('handles GAME_CREATE_SUCCESS action', () => {
  expect(reducer({}, {
    type: ActionTypes.GAME_CREATE_SUCCESS,
    currentGame
  })).toEqual({currentGame})
})

it('handles CURRENT_GAME_ERROR action', () => {
  expect(reducer({}, {
    type: ActionTypes.CURRENT_GAME_ERROR,
    currentGameError
  })).toEqual({currentGameError})
})

it('handles GAME_CREATE_ERROR action', () => {
  expect(reducer({}, {
    type: ActionTypes.GAME_CREATE_ERROR,
    gameCreateError
  })).toEqual({gameCreateError})
})

it('handles MY_GAMES_SYNC action', () => {
  expect(reducer({}, {
    type: ActionTypes.MY_GAMES_SYNC,
    myGames
  })).toEqual({myGames})
})