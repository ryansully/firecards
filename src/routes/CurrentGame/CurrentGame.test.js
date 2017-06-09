import React from 'react'
import { shallow } from 'enzyme'
import { CurrentGame } from './CurrentGame'
import { PageContainer } from '../../components'

const currentGame = {
  name: 'test name',
  key: 'game_key',
}

it('renders without crashing', () => {
  shallow(<CurrentGame />)
})

it('uses game name for page title', () => {
  const wrapper = shallow(<CurrentGame currentGame={currentGame} />)
  const pageContainer = wrapper.find(PageContainer)
  expect(pageContainer.prop('pageTitle')).toEqual(currentGame.name)
})