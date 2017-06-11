import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Form, Header, Message } from 'semantic-ui-react'
import { DeckSelector, PageContainer, withCurrentGame, withDecks } from '../../components'
import './NewGame.css'

export class NewGame extends Component {
  state = {
    gameCreated: false,
    gameName: '',
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.deckList || !nextProps.deckOrder) { return false }
    if (nextState.gameName !== this.state.gameName) { return false }
    return true
  }

  handleGameNameChange = (event) => {
    this.setState({gameName: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const game = {
      name: this.state.gameName,
      decks: this.props.selectedDecks,
    }
    this.props.createGameRequest(game)
    this.setState({gameCreated: true})
  }

  render() {
    const { props } = this
    return (
      <div>
        {this.state.gameCreated && props.currentGame ? (
          <Redirect to={`/game/${props.currentGame.gameKey}`} />
        ) : (
          <PageContainer pageTitle="New Game" className="NewGame">
            <Header as="h2" icon="add" content="New Game" />
            <Form as="fieldset" error={!!props.gameCreateError}>
              <Form.Field>
                <Form.Input id="gameName" label="Name" placeholder="Game Name" onChange={this.handleGameNameChange} />
              </Form.Field>
              <Form.Field>
                  <Form.Input label="Select Decks" control={DeckSelector} {...props} />
              </Form.Field>
              {props.gameCreateError &&
                <Message error={!!props.gameCreateError} header="Server Error"
                  content={props.gameCreateError.code} />
              }
              <Button content="Create Game" onClick={this.handleSubmit} />
            </Form>
          </PageContainer>
        )}
      </div>
    )
  }
}

export default withCurrentGame(withDecks(NewGame))