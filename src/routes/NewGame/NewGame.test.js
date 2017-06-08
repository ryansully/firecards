import React from 'react'
import { shallow } from 'enzyme'
import { Redirect } from 'react-router-dom'
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

it('handles submit button click', () => {
  const createGameRequest = jest.fn()
  const preventDefault = jest.fn()
  const wrapper = shallow(<NewGame deckList={{}} deckOrder={[]}
    createGameRequest={createGameRequest} />)

  wrapper.instance().handleSubmit({preventDefault})
  expect(preventDefault).toBeCalled()
  expect(createGameRequest).toBeCalled()
  expect(wrapper.state('gameCreated')).toEqual(true)
})

it('redirects after game is created', () => {
  const createGameRequest = jest.fn()
  const wrapper = shallow(<NewGame deckList={{}} deckOrder={[]} currentGame={{}}
    createGameRequest={createGameRequest} />)

  wrapper.instance().setState({gameCreated: true})
  expect(wrapper.find(Redirect).length).toEqual(1)
})

it('does not update if there is no deck list or order', () => {
  const deckList = {}
  const wrapper = shallow(<NewGame deckList={deckList} />)
  expect(wrapper.instance().shouldComponentUpdate({deckList})).toEqual(false)
})