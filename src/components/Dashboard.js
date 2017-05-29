import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Header } from 'semantic-ui-react'

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <Header as="h2" icon="game" content="Games" />
      <Button as={Link} to="/game/new" icon="add" content="New Game" />
    </div>
  )
}

export default Dashboard