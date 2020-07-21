import React, { useContext } from 'react';
import useToggle from './hooks/useToggle';
import useInputState from './hooks/useInputState'
import { Button, CloseButton, Collapse, Editable,
     EditableInput, EditablePreview, Textarea } from '@chakra-ui/core';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styles from './List.module.css';
import Card from './Card';
import appContext from '../Context';


const List = (props) => {
    const [show, toggleShow] = useToggle(false);
    const [cardText, updateCardText, resetText] = useInputState();
    const [hidden, toggleHidden] = useToggle(false);

    const { boardOrg, setBoardOrg } = useContext(appContext);

    const addCard = (e) => {
        e.preventDefault();
        const listId = props.list.id
        const newCardId = `card-${Object.keys(boardOrg.cards).length + 1}`;
        const newCard = {
            id: newCardId,
            content: cardText,
        };

        const newBoardOrg = {
             ...boardOrg,
             cards: {
                 ...boardOrg.cards,
                [newCardId]: newCard,
             }
   
        };
        newBoardOrg.lists[listId].cardIds.push(newCardId);

        console.log(newBoardOrg);
        setBoardOrg(newBoardOrg);
        hideCollapse();
    };

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
      <Draggable draggableId={props.list.id} index={props.index}>
        {(provided) => (
          <div
            className={styles.listHolder}
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
          >
            <Editable
              className={styles.listName}
              defaultValue="List Name..."
              value={props.list.title}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
            <Droppable droppableId={props.list.id} type="card">
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
              <form onSubmit={addCard}>
                <Textarea
                  className={styles.textArea}
                  value={cardText}
                  onChange={updateCardText}
                  placeholder="Enter a title for this card..."
                />
                <div>
                  <Button variantColor="green" type='submit' >Add Card</Button>
                  <CloseButton onClick={hideCollapse} />
                </div>
              </form>
            </Collapse>
          </div>
        )}
      </Draggable>
    );
};

export default List;