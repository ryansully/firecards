import React from 'react'
import { shallow } from 'enzyme'
import { App } from './App'
import { Route } from 'react-router-dom'
import { FirebaseUIAuth } from './components'

it('renders without crashing', () => {
  shallow(<App />)
})

it('renders the auth component when logged out', () => {
  const wrapper = shallow(<App user={null} />)
  expect(wrapper.find(FirebaseUIAuth).length).toEqual(1)
})

it('renders routes when logged in', () => {
  const wrapper = shallow(<App user={{}} />)
  expect(wrapper.find(Route).length).toBeGreaterThan(0)
})