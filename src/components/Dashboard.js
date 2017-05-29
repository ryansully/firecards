import React from 'react'
import { Button, Container, Header } from 'semantic-ui-react'

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <Container>
        <Header as="h2" icon="gamepad" content="Games" />
        <Button>New Game</Button>
      </Container>
    </div>
  )
}

export default Dashboard