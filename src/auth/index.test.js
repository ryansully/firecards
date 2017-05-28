import * as auth from './index'

it('returns null from local storage if there is no authenticated user', () => {
  const empty = auth.getUserFromLocalStorage()
  expect(empty).toBeNull()
})

it('returns a user from local storage', () => {
  localStorage['firebase:authUser:'] = '{"user": "test"}'
  const user = auth.getUserFromLocalStorage()
  expect(user.user).toEqual('test')
})