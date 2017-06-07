import React from 'react'
import { Dashboard, PageContainer } from '../../components'
import './Home.css'

const Home = (props) => {
  return (
    <PageContainer className="Home">
      <Dashboard />
    </PageContainer>
  )
}

export default Home