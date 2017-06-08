import React from 'react'
import { Container, Dimmer, Loader } from 'semantic-ui-react'
import Navigation from '../Navigation/Navigation'
import './PageContainer.css'

const PageContainer = ({ pageTitle, className, children, loading = false }) => {
  document.title = (pageTitle ? `${pageTitle} - ` : '') + 'FireCards'
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