import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Header } from 'semantic-ui-react'
import { DeckSelector, PageContainer, withCurrentGame, withDecks } from '../../components'

export class NewGame extends Component {
  state = {
    gameCreated: false
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.deckList || !nextProps.deckOrder) { return false }
    return true
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.createGameRequest(this.props.selectedDecks)
    this.setState({gameCreated: true})
  }

  render() {
    const { props } = this
    return (
      <div>
        {this.state.gameCreated && props.currentGame ? (
          <Redirect to={`/game/${props.currentGame.key}`} />
        ) : (
          <PageContainer className="NewGame" loading={!(props.deckList && props.deckOrder)}>
            <Header as="h2" icon="add" content="New Game" />
            <DeckSelector {...props} submitButton={<Button content="Create Game" onClick={this.handleSubmit} />} />
          </PageContainer>
        )}
      </div>
    )
  }
}

export default withCurrentGame(withDecks(NewGame))