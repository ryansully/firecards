import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Segment } from 'semantic-ui-react'
import { GameList } from '../components'
import { withGames } from '../game/components'
import { withCurrentUser } from '../user/components'

export const Dashboard = ({ currentUser, myGames }) => {
  const canCreateGame = currentUser && (currentUser.isAdmin || currentUser.isGuest)
  return (
    <div className="Dashboard">
      <Header as="h2" icon="game" content="Games" />
      {canCreateGame &&
        <Button as={Link} to="/game/new" icon="add" content="New Game" />
      }
      <Segment loading={!myGames}>
        <GameList headerText="My Games" games={myGames} />
      </Segment>
    </div>
  )
}

export default withGames(withCurrentUser(Dashboard))