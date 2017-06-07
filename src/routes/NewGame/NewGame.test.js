import React from 'react'
import { shallow } from 'enzyme'
import { NewGame } from './NewGame'
import { PageContainer } from '../../components'

it('renders without crashing', () => {
  shallow(<NewGame />)
})

it('shows a loading page container with no deck list', () => {
  const wrapper = shallow(<NewGame />)
  const container = wrapper.find(PageContainer)
  expect(container.length).toEqual(1)
  expect(container.prop('loading')).toEqual(true)
})

it('hides the page container loader when there is deck list and order', () => {
  const wrapper = shallow(<NewGame deckList={{}} deckOrder={[]} />)
  const container = wrapper.find(PageContainer)
  expect(container.length).toEqual(1)
  expect(container.prop('loading')).toEqual(false)
})