import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import { PageContainer } from '../../components'
import { withCurrentGame } from '../../game/components'
import { selectors as authSelectors } from '../../auth/dux'

export class PlayGame extends Component {
  state = {
    lastPlayedUpdated: false,
  }

  componentWillReceiveProps(nextProps) {
    const { authUser, currentGame } = nextProps

    // only update last played timestamp on initial load
    if (authUser && currentGame && !this.state.lastPlayedUpdated) {
      this.props.updateLastPlayed(authUser.uid, currentGame.gameKey)
      this.setState({lastPlayedUpdated: true})
    }
  }

  render() {
    const { currentGame } = this.props
    const pageTitle = currentGame ? currentGame.name : ''
    return (
      <PageContainer pageTitle={pageTitle} className="PlayGame" loading={!currentGame}>
        {currentGame &&
          <div>
            <Header as="h2" icon="game" content={currentGame.name} />
          </div>
        }
      </PageContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  authUser: authSelectors.getAuthUser(state),
})

export default withCurrentGame(connect(mapStateToProps)(PlayGame))