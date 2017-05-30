import React from 'react'
import { Container as UIContainer } from 'semantic-ui-react'
import Navigation from './Navigation/Navigation'

const Container = ({ children, activeNavItem }) => {
  return (
    <div className="Container">
      <Navigation />
      <UIContainer>
        <div>{children}</div>
      </UIContainer>
    </div>
  )
}

export default Container