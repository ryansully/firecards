import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ui, uiConfig } from './firebase'
import { actions as authActions, selectors as authSelectors } from './auth/dux'
import { Home, NewGame } from './routes'
import { FirebaseUIAuth } from './components'

import './App.css'

export const App = ({ user }) => {
  return (
    <Router>
      {user ? (
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/game/new" component={NewGame} />
        </div>
      ) : (
          <div className="App">
            <header>
              <img src={process.env.PUBLIC_URL + '/static/images/icons/icon-192x192.png'} alt="logo" className="logo" />
              <h2>FireCards</h2>
            </header>
            <p className="intro">
              A party game for horrible people,
                powered by <a href="https://firebase.google.com" target="_blank" rel="noopener noreferrer">Firebase</a>.
            </p>
            <FirebaseUIAuth ui={ui} {...uiConfig} />
          </div>
        )}
    </Router>
  )
}

const mapStateToProps = (state) => ({
  user: authSelectors.getUser(state)
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(authActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)