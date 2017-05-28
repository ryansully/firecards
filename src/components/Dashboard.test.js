import React from 'react'
import { shallow } from 'enzyme'
import { Dashboard } from './Dashboard'

it('renders without crashing', () => {
  shallow(<Dashboard />)
})

it('renders a sign out button when logged in', () => {
  const wrapper = shallow(<Dashboard user={{}} />)
  expect(wrapper.find('button')).toHaveLength(1)
})