import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as gameActions, selectors as gameSelectors } from '../dux'
import { withCurrentUser } from '../../user/components'

const withGames = (WrappedComponent) => {
  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component'

  class WithGames extends Component {
    static displayName = `withGames(${wrappedComponentName})`

    componentWillReceiveProps(nextProps) {
      /* istanbul ignore next */ // TODO: how the hell do I test this??
      if (!this.props.myGames.length && nextProps.currentUser !== this.props.currentUser) {
        this.props.loadMyGames(nextProps.currentUser)
      }
    }

    componentDidMount() {
      if (!this.props.myGames.length && this.props.currentUser) {
        this.props.loadMyGames(this.props.currentUser)
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => ({
    myGames: gameSelectors.getMyGames(state),
    myLastPlayedGames: gameSelectors.getMyGamesSortedByLastPlayedDesc(state),
  })

  const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(gameActions, dispatch),
  })

  return withCurrentUser(connect(mapStateToProps, mapDispatchToProps)(WithGames))
}

export default withGames