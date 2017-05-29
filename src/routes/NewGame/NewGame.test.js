import React from 'react'
import { shallow } from 'enzyme'
import NewGame from './NewGame'

it('renders without crashing', () => {
  shallow(<NewGame />)
})