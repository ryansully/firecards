import React from 'react'
import Navigation from './Navigation/Navigation'

const Container = ({ children }) => {
  const childComponentName = children.type.WrappedComponent ? children.type.WrappedComponent.name : children.type.name
  return (
    <div className="Container">
      <Navigation activeItem={childComponentName} />
      {children}
    </div>
  )
}

export default Container