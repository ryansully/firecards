import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Header } from 'semantic-ui-react'
import { withCurrentUser } from '../user/components'

export const Dashboard = ({ currentUser }) => {
  const canCreateGame = currentUser && (currentUser.isAdmin || currentUser.isGuest)
  return (
    <div className="Dashboard">
      <Header as="h2" icon="game" content="Games" />
      {canCreateGame &&
      <Button as={Link} to="/game/new" icon="add" content="New Game" />
      }
    </div>
  )
}

export default withCurrentUser(Dashboard)