import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <div className="Home">
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

export default Home