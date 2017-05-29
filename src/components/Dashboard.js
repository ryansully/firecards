import React from 'react'
import { Button, Header } from 'semantic-ui-react'

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <Header as="h2" icon="gamepad" content="Games" />
      <Button>New Game</Button>
    </div>
  )
}

export default Dashboard