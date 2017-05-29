import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as authActions } from '../../auth/dux'
import { ui, uiConfig } from '../../firebase'
import { Container, Dashboard, FirebaseUIAuth } from '../../components'
import './Home.css'

export const Home = ({ user }) => {
  return (
    <div className="Home">
      {user ? (
        <Container>
          <Dashboard />
        </Container>
      ) : (
        <div className="landing">
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
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(authActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)