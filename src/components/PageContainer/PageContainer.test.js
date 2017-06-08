import React from 'react'
import { shallow } from 'enzyme'
import PageContainer from './PageContainer'

it('renders without crashing', () => {
  shallow(<PageContainer />)
})

it('uses the default page title', () => {
  shallow(<PageContainer />)
  expect(document.title).toEqual('FireCards')
})

it('uses a custom page title', () => {
  const pageTitle = "Test Page"
  shallow(<PageContainer pageTitle={pageTitle} />)
  expect(document.title).toEqual(`${pageTitle} - FireCards`)
})