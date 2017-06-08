import React from 'react'
import { shallow } from 'enzyme'
import { CurrentGame } from './CurrentGame'

const currentGame = {
  key: 'game_key'
}

it('renders without crashing', () => {
  shallow(<CurrentGame currentGame={currentGame} />)
})