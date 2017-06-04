import React from 'react'
import { Container, Dimmer, Loader } from 'semantic-ui-react'
import Navigation from '../Navigation/Navigation'
import './PageContainer.css'

const PageContainer = ({ className, children, loading = false }) => {
  return (
    <Dimmer.Dimmable className={`${className || ''} PageContainer`} dimmed={loading}>
      <Navigation />
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
      <Container>
        <div>{children}</div>
      </Container>
    </Dimmer.Dimmable>
  )
}

export default PageContainer