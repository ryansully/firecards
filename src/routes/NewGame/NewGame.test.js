import React from 'react'
import { shallow } from 'enzyme'
import { NewGame } from './NewGame'
import { DeckSelector } from '../../components'

it('renders without crashing', () => {
  shallow(<NewGame />)
})

it('renders the deck list', () => {
  const wrapper = shallow(<NewGame />)
  expect(wrapper.find(DeckSelector).length).toEqual(1)
})