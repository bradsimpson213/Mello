import React, { useContext } from 'react';
import useToggle from './hooks/useToggle';
import useInputState from './hooks/useInputState'
import { Button, CloseButton, Collapse, Editable,
     EditableInput, EditablePreview, Textarea } from '@chakra-ui/core';
import { Droppable } from 'react-beautiful-dnd';
import styles from './List.module.css';
import Card from './Card';
// import appContext from '../Context';


const List = (props) => {
    const [show, toggleShow] = useToggle(false);
    const [text, updateText, resetText] = useInputState();
    const [hidden, toggleHidden] = useToggle(false);

    // const { boardOrg } = useContext(appContext);

    const saveCard = () => {};

    const hideCollapse = () => {
        resetText();
        toggleShow();
        toggleHidden();
    };

    const openCollapse = () => {
        toggleHidden();
        toggleShow();
    };

    return (
      <div className={styles.listHolder}>
        <Editable
          className={styles.listName}
          defaultValue="List Name..."
          value={props.list.title}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
        <Droppable droppableId={props.list.id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              className={styles.listCardArea}
              {...provided.droppableProps}
            >
              {props.cards
                ? props.cards.map((card, index) => (
                    <Card key={card.id} card={card} index={index} />
                  ))
                : ""}
                {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Button
          leftIcon="add"
          variantColor="darkgray"
          variant="outline"
          isDisabled={hidden}
          onClick={openCollapse}
        >
          Add another card
        </Button>
        <Collapse className={styles.collapseCard} isOpen={show}>
          <form onSubmit={saveCard}>
            <Textarea
              className={styles.textArea}
              value={text}
              onChange={updateText}
              placeholder="Enter a title for this card..."
            />
            <div>
              <Button variantColor="green">Add Card</Button>
              <CloseButton onClick={hideCollapse} />
            </div>
          </form>
        </Collapse>
      </div>
    );
};

export default List;