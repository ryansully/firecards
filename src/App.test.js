import React from 'react'
import { shallow } from 'enzyme'
import { App } from './App'

const user = {name: 'test'}

it('renders without crashing', () => {
  shallow(<App />)
})

it('creates and removes listener during mount and unmount', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.instance().removeListener).toBeDefined()
  const removeListener = wrapper.instance().removeListener = jest.fn()
  wrapper.unmount()
  expect(removeListener).toBeCalled()
})

it('authenticates user if user is not in state', () => {
  const authUserRequest = jest.fn()
  const signOutRequest = jest.fn()

  const wrapper = shallow(<App authUserRequest={authUserRequest} signOutRequest={signOutRequest} />)
  wrapper.instance().handleAuthStateChange(user)
  expect(authUserRequest).toBeCalled()
  expect(signOutRequest).not.toBeCalled()
})

it('does not authenticate user if user is already in state', () => {
  const authUserRequest = jest.fn()
  const signOutRequest = jest.fn()

  const wrapper = shallow(<App authUserRequest={authUserRequest} signOutRequest={signOutRequest} user={user} />)
  wrapper.instance().handleAuthStateChange(user)
  expect(authUserRequest).not.toBeCalled()
  expect(signOutRequest).not.toBeCalled()
})

it('signs out user if user is in state', () => {
  const authUserRequest = jest.fn()
  const signOutRequest = jest.fn()

  const wrapper = shallow(<App authUserRequest={authUserRequest} signOutRequest={signOutRequest} user={user} />)
  wrapper.instance().handleAuthStateChange(null)
  expect(authUserRequest).not.toBeCalled()
  expect(signOutRequest).toBeCalled()
})

it('does not sign out user if user is not in state', () => {
  const authUserRequest = jest.fn()
  const signOutRequest = jest.fn()

  const wrapper = shallow(<App authUserRequest={authUserRequest} signOutRequest={signOutRequest} />)
  wrapper.instance().handleAuthStateChange(null)
  expect(authUserRequest).not.toBeCalled()
  expect(signOutRequest).not.toBeCalled()
})