import React from 'react'
import { Container as UIContainer } from 'semantic-ui-react'
import Navigation from './Navigation/Navigation'

const Container = ({ children }) => {
  const childComponentName = children.type.WrappedComponent ? children.type.WrappedComponent.name : children.type.name
  return (
    <div className="Container">
      <Navigation activeItem={childComponentName} />
      <UIContainer>
        <div>{children}</div>
      </UIContainer>
    </div>
  )
}

export default Container