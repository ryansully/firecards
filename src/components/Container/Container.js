import React from 'react'
import { Container as UIContainer, Dimmer, Loader } from 'semantic-ui-react'
import Navigation from '../Navigation/Navigation'
import './Container.css'

const Container = ({ children, loading = false }) => {
  return (
    <div className="Container">
      <Dimmer.Dimmable dimmed={loading}>
        <Navigation />
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        <UIContainer>
          <div>{children}</div>
        </UIContainer>
      </Dimmer.Dimmable>
    </div>
  )
}

export default Container