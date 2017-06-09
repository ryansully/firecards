import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as userActions, selectors as userSelectors } from '../dux'

const withCurrentUser = (WrappedComponent) => {
  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component'

  class WithCurrentUser extends Component {
    static displayName = `withCurrentUser(${wrappedComponentName})`

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => ({
    currentUser: userSelectors.getCurrentUser(state)
  })

  const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(userActions, dispatch)
  })

  return connect(mapStateToProps, mapDispatchToProps)(WithCurrentUser)
}

export default withCurrentUser