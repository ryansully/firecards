import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as gameActions, selectors as gameSelectors } from '../dux'
import { selectors as authSelectors } from '../../auth/dux'

const withGames = (WrappedComponent) => {
  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component'

  class WithGames extends Component {
    static displayName = `withGames(${wrappedComponentName})`

    componentDidMount() {
      if (!this.props.myGames.length && this.props.authUser) {
        this.props.loadMyGames(this.props.authUser)
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => ({
    authUser: authSelectors.getAuthUser(state),
    myGames: gameSelectors.getMyGames(state),
    myLastPlayedGames: gameSelectors.getMyGamesSortedByLastPlayedDesc(state),
  })

  const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(gameActions, dispatch),
  })

  return connect(mapStateToProps, mapDispatchToProps)(WithGames)
}

export default withGames