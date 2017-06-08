import React from 'react'
import { PageContainer, withCurrentGame } from '../../components'

export const CurrentGame = (props) => {
  return (
    <PageContainer className="CurrentGame" loading={!props.currentGame}>
    </PageContainer>
  )
}

export default withCurrentGame(CurrentGame)