import React from 'react'
import { shallow } from 'enzyme'
import { Navigation } from './Navigation'

const authUser = {
  photoURL: 'image.jpg',
  displayName: 'Testy McTestface',
}

it('renders without crashing', () => {
  shallow(<Navigation authUser={authUser} />)
})