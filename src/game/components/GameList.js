import React from 'react'
import { Link } from 'react-router-dom'
import { Header, List } from 'semantic-ui-react'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

const GameList = ({ headerAs = 'h3', headerText, games = [] }) => {
  return (
    <div>
      <Header as={headerAs} content={headerText} />
      {!!games.length && (
        <List divided relaxed="very" selection>
          {games.map((game) => (
            <List.Item key={game.gameKey} as={Link} to={`/game/${game.gameKey}`}>
              <List.Content>
                <List.Header content={game.name} />
                <List.Description content={`Last played ${distanceInWordsToNow(game.lastPlayedAt)} ago`} />
              </List.Content>
            </List.Item>
          ))}
        </List>
      )}
    </div>
  )
}

export default GameList