import React from 'react'
import { shallow } from 'enzyme'
import PageContainer from './PageContainer'

it('renders without crashing', () => {
  shallow(<PageContainer />)
})