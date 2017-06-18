import React from 'react'
import { Link } from 'react-router-dom'
import { Header, List } from 'semantic-ui-react'

const GameList = ({ headerAs = 'h3', headerText, games = [] }) => {
  return (
    <div>
      <Header as={headerAs} content={headerText} />
      {!!games.length && (
        <List divided relaxed="very">
          {games.map((game) => (
            <List.Item key={game.gameKey}>
              <List.Content>
                <List.Header as={Link} to={`/game/${game.gameKey}`} content={game.name} />
              </List.Content>
            </List.Item>
          ))}
        </List>
      )}
    </div>
  )
}

export default GameList