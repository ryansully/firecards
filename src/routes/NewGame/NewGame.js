import React from 'react'
import { Button, Header } from 'semantic-ui-react'
import { DeckSelector, PageContainer, withDecks } from '../../components'

export const NewGame = (props) => {
  return (
    <PageContainer className="NewGame" loading={!(props.deckList && props.deckOrder)}>
      <Header as="h2" icon="add" content="New Game" />
      <DeckSelector {...props} submitButton={<Button content="Create Game" onClick={handleSubmit} />} />
    </PageContainer>
  )
}

export function handleSubmit(event) {
  // event.preventDefault()
  // TODO: dispatch action to create new game
}

export default withDecks(NewGame)