import React from 'react'
import { shallow } from 'enzyme'
import { Navigation } from './Navigation'

const user = {
  photoURL: 'image.jpg'
}

it('renders without crashing', () => {
  shallow(<Navigation user={user} />)
})