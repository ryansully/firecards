import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import { PageContainer, withCurrentGame } from '../../components'
import { selectors as authSelectors } from '../../auth/dux'

export class CurrentGame extends Component {
  componentWillReceiveProps(nextProps) {
    const { authUser, currentGame } = nextProps
    if (authUser && currentGame) {
      this.props.updateLastPlayed(authUser.uid, currentGame.gameKey)
    }
  }

  render() {
    const { currentGame } = this.props
    const pageTitle = currentGame ? currentGame.name : ''
    return (
      <PageContainer pageTitle={pageTitle} className="CurrentGame" loading={!currentGame}>
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

export default withCurrentGame(connect(mapStateToProps)(CurrentGame))