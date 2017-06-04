import React from 'react'
import { Container as UIContainer, Dimmer, Loader } from 'semantic-ui-react'
import Navigation from '../Navigation/Navigation'
import './Container.css'

const Container = ({ className, children, loading = false }) => {
  return (
    <Dimmer.Dimmable className={`${className || ''} Container`} dimmed={loading}>
      <Navigation />
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
      <UIContainer>
        <div>{children}</div>
      </UIContainer>
    </Dimmer.Dimmable>
  )
}

export default Container