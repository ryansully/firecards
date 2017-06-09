import React from 'react'
import { shallow } from 'enzyme'
import { Button } from 'semantic-ui-react'
import { Dashboard } from './Dashboard'

it('renders without crashing', () => {
  shallow(<Dashboard />)
})

it('only shows New Game button if user is admin or guest', () => {
  const currentUser = {
    isAdmin: false,
    isGuest: true,
  }
  const wrapper = shallow(<Dashboard currentUser={currentUser} />)
  expect(wrapper.find(Button).length).toEqual(1)
})