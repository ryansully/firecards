import React from 'react'
import { Link } from 'react-router-dom'
import { Header, Table } from 'semantic-ui-react'

const GameList = ({ headerAs = 'h3', headerText, games = [] }) => {
  return (
    <div>
      <Header as={headerAs} content={headerText} />
      {!!games.length && (
        <Table stackable striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {games.map((game) => (
              <Table.Row key={game.gameKey}>
                <Table.Cell>
                  <Link to={`/game/${game.gameKey}`}>{game.name}</Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  )
}

export default GameList