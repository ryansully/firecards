import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Segment } from 'semantic-ui-react'
import { GameList } from '../components'
import { withGames } from '../game/components'
import { withCurrentUser } from '../user/components'

export const Dashboard = ({ currentUser, myLastPlayedGames }) => {
  const canCreateGame = currentUser && (currentUser.isAdmin || currentUser.isGuest)
  return (
    <div className="Dashboard">
      <Header as="h2" icon="game" content="Games" />
      {canCreateGame &&
        <Button as={Link} to="/game/new" content="New Game" icon="add" labelPosition="left" />
      }
      <Segment loading={!myLastPlayedGames}>
        <GameList headerText="My Games" games={myLastPlayedGames} />
      </Segment>
    </div>
  )
}

export default withGames(withCurrentUser(Dashboard))