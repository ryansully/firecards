import React from 'react'
import { Checkbox, Divider, Form, Icon } from 'semantic-ui-react'

const DeckSelector = ({
  deckList, deckOrder, officialDecks, selectedDecks, submitButton,
  areDecksSelected, toggleAllSelected, toggleOfficialSelected,
  toggleSelectedDeck }) => {

  if (!(deckList && deckOrder)) { return null }

  return (
    <Form className="DeckSelector">
      <Form.Field>
        <Checkbox label="Toggle All" className="toggleAll"
          checked={areDecksSelected(deckOrder)}
          onChange={toggleAllSelected}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox label="Toggle Official" className="toggleOfficial"
          checked={areDecksSelected(officialDecks)}
          onChange={toggleOfficialSelected}
        />
      </Form.Field>
      <Divider />
      {deckOrder.map((id) => {
        const deck = deckList[id]
        const icon = typeof deck.icon === 'string'
          ? <Icon name={deck.icon} />
          : <Icon {...deck.icon} />
        return (
          <Form.Field key={id} control={Checkbox} value={id}
            label={<label><span dangerouslySetInnerHTML={{ __html: deck.name }} /> {icon}</label>}
            checked={selectedDecks.includes(id)}
            onChange={toggleSelectedDeck}
          />
        )
      })}
      {submitButton && React.cloneElement(submitButton, { disabled: !selectedDecks.length })}
    </Form>
  )
}

export default DeckSelector