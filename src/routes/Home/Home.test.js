import React from 'react'
import { shallow } from 'enzyme'
import { Home } from './Home'
import Dashboard from '../../components/Dashboard'
import FirebaseUIAuth from '../../components/FirebaseUIAuth'

it('renders without crashing', () => {
  shallow(<Home />)
})

it('renders the auth component when logged out', () => {
  const wrapper = shallow(<Home user={null} />)
  expect(wrapper.find(FirebaseUIAuth)).toHaveLength(1)
})

it('renders the dashboard when logged in', () => {
  const wrapper = shallow(<Home user={{}} />)
  expect(wrapper.find(Dashboard)).toHaveLength(1)
})