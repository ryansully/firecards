import React from 'react'
import { shallow } from 'enzyme'
import Home from './Home'
import { Dashboard } from '../../components'

it('renders without crashing', () => {
  shallow(<Home />)
})

it('renders the dashboard', () => {
  const wrapper = shallow(<Home />)
  expect(wrapper.find(Dashboard)).toHaveLength(1)
})