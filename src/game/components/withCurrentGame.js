import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as gameActions, selectors as gameSelectors } from '../dux'

const withCurrentGame = (WrappedComponent) => {
  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component'

  class WithCurrentGame extends Component {
    static displayName = `withCurrentGame(${wrappedComponentName})`

    componentDidMount() {
      const { currentGame, match } = this.props

      // get game key from route params
      const gameKey = match ? match.params.game_key : null

      // if new game was just created, use existing currentGame
      // instead of loading from database
      if (currentGame && currentGame.gameKey === gameKey) { return }

      // load game from database using game key from route params
      if (gameKey) {
        this.props.loadCurrentGame(gameKey)
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => ({
    currentGame: gameSelectors.getCurrentGame(state),
    currentGameError: gameSelectors.getCurrentGameError(state),
    gameCreateError: gameSelectors.getGameCreateError(state),
  })

  const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(gameActions, dispatch)
  })

  return connect(mapStateToProps, mapDispatchToProps)(WithCurrentGame)
}

export default withCurrentGame