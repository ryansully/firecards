import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as decksActions, selectors as decksSelectors } from '../../decks/dux'

const withDecks = (WrappedComponent) => {
  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component'

  class WithDecks extends Component {
    static displayName = `withDecks(${wrappedComponentName})`

    componentDidMount() {
      if (!this.props.deckList) {
        this.props.fetchDeckIndex()
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => ({
    deckList: decksSelectors.getDeckList(state),
    deckOrder: decksSelectors.getDeckOrder(state),
    officialDecks: decksSelectors.getOfficialDecks(state),
    selectedDecks: decksSelectors.getSelectedDecks(state),
  })

  const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(decksActions, dispatch)
  })

  return connect(mapStateToProps, mapDispatchToProps)(WithDecks)
}

export default withDecks