import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as authActions } from '../auth/dux'

export const Dashboard = ({ signOutRequest }) => {
  return (
    <div className="Dashboard">
      <h3>Dashboard</h3>
      <button onClick={signOutRequest}>Sign Out</button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(authActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)