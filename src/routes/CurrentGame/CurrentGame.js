import React from 'react'
import { Header } from 'semantic-ui-react'
import { PageContainer, withCurrentGame } from '../../components'

export const CurrentGame = ({ currentGame }) => {
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

export default withCurrentGame(CurrentGame)