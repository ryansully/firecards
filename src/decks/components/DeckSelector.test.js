import React from 'react'
import { shallow } from 'enzyme'
import { DeckSelector } from './DeckSelector'

const deckList = {
  deck1: {
    name: 'deck1'
  },
  deck2: {
    name: 'deck2',
    icon: 'square'
  }
}

const deckOrder = [
  'deck1',
  'deck2'
]

const selectedDecks = ['Base']

const areDecksSelected = () => false

const submitButton = (props) => <button {...props} />

const props = {
  deckList,
  deckOrder,
  selectedDecks,
  areDecksSelected,
  submitButton,
}

it('renders without crashing', () => {
  shallow(<DeckSelector {...props} />)
})

it('shows a loader with no deck list and order', () => {
  const wrapper = shallow(<DeckSelector areDecksSelected={areDecksSelected}/>)
  expect(wrapper.prop('loading')).toEqual(true)
})

it('hides the loader when there is deck list and order', () => {
  const wrapper = shallow(<DeckSelector {...props} />)
  expect(wrapper.prop('loading')).toEqual(false)
})

it('renders a form when passed deckList and deckOrder', () => {
  const wrapper = shallow(<DeckSelector {...props} />)
  expect(wrapper.find('.DeckSelector').length).toEqual(1)
})