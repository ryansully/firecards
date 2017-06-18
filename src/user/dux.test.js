import reducer, { actions, ActionTypes, initialState, selectors } from './dux'

const currentUser = {
  isAdmin: true,
  isGuest: true,
}

it('creates action to sync the current user', () => {
  const currentUser = {name: 'test'}
  expect(actions.syncCurrentUser(currentUser)).toEqual({
    type: ActionTypes.CURRENT_USER_SYNC,
    currentUser
  })
})

it('selects user from state', () => {
  expect(selectors.getCurrentUser({ user: {currentUser} })).toEqual(currentUser)
})

it('selects user games from state', () => {
  const games = {'game_key': {lastPlayedAt: 1}}
  currentUser.games = games
  expect(selectors.getUserGames({user: {currentUser}})).toEqual(games)
})

it('selects user admin status from state', () => {
  expect(selectors.isUserAdmin({user: {currentUser}})).toEqual(true)
})

it('selects user guest status from state', () => {
  expect(selectors.isUserGuest({user: {currentUser}})).toEqual(true)
})

it('returns the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState)
})

it('handles CURRENT_USER_SYNC action', () => {
  const currentUser = {name: 'test'}
  expect(reducer({}, {
    type: ActionTypes.CURRENT_USER_SYNC,
    currentUser
  })).toEqual({
    currentUser
  })
})