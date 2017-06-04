import React from 'react'
import { Header } from 'semantic-ui-react'
import { PageContainer } from '../../components'

const NewGame = () => {
  return (
    <PageContainer className="NewGame">
        <Header as="h2" icon="add" content="New Game" />
    </PageContainer>
  )
}

export default NewGame