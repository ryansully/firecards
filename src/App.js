import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { auth } from './firebase'
import { actions as authActions } from './auth/dux'
import { Home, NewGame } from './routes'

import './App.css'

export class App extends Component {
  handleAuthStateChange = (user) => {
    if (user) {
      if (!this.props.user) { this.props.authUserRequest(user) }
    } else {
      if (this.props.user) { this.props.signOutRequest() }
    }
  }

  componentWillMount() {
    this.removeListener = auth.onAuthStateChanged(this.handleAuthStateChange)
  }

  componentWillUnmount() {
    this.removeListener()
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route exact path="/game/new" component={NewGame} />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(authActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)