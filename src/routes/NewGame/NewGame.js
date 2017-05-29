import React from 'react'
import { Header } from 'semantic-ui-react'
import { Container } from '../../components'

const NewGame = () => {
  return (
    <div className="NewGame">
      <Container>
        <Header as="h2" icon="add" content="New Game" />
      </Container>
    </div>
  )
}

export default NewGame