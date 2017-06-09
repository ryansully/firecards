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
      if (!this.props.currentGame && this.props.match.params.game_key) {
        this.props.loadCurrentGame(this.props.match.params.game_key)
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => ({
    currentGame: gameSelectors.getCurrentGame(state)
  })

  const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(gameActions, dispatch)
  })

  return connect(mapStateToProps, mapDispatchToProps)(WithCurrentGame)
}

export default withCurrentGame