import React from 'react'
import { shallow } from 'enzyme'
import Container from './Container'
import Navigation from './Navigation/Navigation'

const children = {
  type: {
    name: 'Component'
  }
}

it('renders without crashing', () => {
  shallow(<Container children={children} />)
})

it('gets the name of a wrapped child component', () => {
  const wrapper = shallow(
    <Container>
      <Navigation />
    </Container>
  )
  expect(wrapper.find(Navigation).node.props.hasOwnProperty('activeItem')).toEqual(true)
})