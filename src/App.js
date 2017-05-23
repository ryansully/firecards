import React, { Component } from 'react'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <img src={process.env.PUBLIC_URL + '/static/images/icons/icon-192x192.png'} alt="logo" className="logo" />
          <h2>FireCards</h2>
        </header>
        <p className="intro">
          A party game for horrible people,
            powered by <a href="https://firebase.google.com" target="_blank" rel="noopener noreferrer">Firebase</a>.
        </p>
      </div>
    )
  }
}

export default App