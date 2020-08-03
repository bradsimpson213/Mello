import React, { useContext, useRef, useState } from 'react';
import useToggle from './hooks/useToggle';
import useInputState from './hooks/useInputState';
import { Button, ButtonGroup, CloseButton, Collapse, Editable, 
       EditableInput, EditablePreview, Flex, IconButton, Textarea } from '@chakra-ui/core';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import NaturalDragAnimation from "natural-drag-animation-rbdnd";
import { baseUrl } from "../config";
import styles from './List.module.css';
import Card from './Card';
import appContext from '../Context';


const List = (props) => {
    const [show, toggleShow] = useToggle(false);
    const [cardText, updateCardText, resetText] = useInputState();
    const [hidden, toggleHidden] = useToggle(false);
    const [listText, setListText] = useState(props.list.title);

    const { boardOrg, setBoardOrg, token } = useContext(appContext);

    const firstField = useRef();

    const addCard = (e) => {
        e.preventDefault();
        const listId = props.list.id
        const newCardId = `card-${Object.keys(boardOrg.cards).length + 1}`;
        const newCard = {
            id: newCardId,
            title: cardText,
        };

        const newBoardOrg = {
             ...boardOrg,
             cards: {
                 ...boardOrg.cards,
                [newCardId]: newCard,
             }
   
        };
        newBoardOrg.lists[listId].cardIds.push(newCardId);
        setBoardOrg(newBoardOrg);
        saveCard(newCard, listId)
        hideCollapse();
    };

    const saveCard = async (newCard, listId) => {
    const res = await fetch(`${baseUrl}/cards/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ newCard: newCard, listId: listId }),
      }
    );
    const data = res.json();
    if (data.error) {
      alert("Error saving new Card to Database.");
    };
  };

  // const EditableControls = ({ isEditing, onSubmit, onCancel, onRequestEdit }) => {
  //   return isEditing ? (
  //     <ButtonGroup justifyContent="right" size="sm">
  //       <IconButton icon="check" onClick={onSubmit} />
  //       <IconButton icon="close" onClick={onCancel} />
  //     </ButtonGroup>
  //   ) : (
  //       <Flex justifyContent="right">
  //         <IconButton size="sm" icon="edit" onClick={onRequestEdit} />
  //       </Flex>
  //     );
  // };


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
        {(provided, snapshot) => (
          <NaturalDragAnimation
            style={provided.draggableProps.style}
            snapshot={snapshot}
          >
            {(style) => (
              <div
                className={styles.listHolder}
                {...provided.draggableProps}
                ref={provided.innerRef}
                {...provided.dragHandleProps}
                style={style}
              >
                <div>
                <>
                  <Editable
                    className={styles.listName}
                    value={listText}
                    onChange={setListText}
                
                  >
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                  </>
                </div>
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
                <Collapse className={styles.collapseCard} isOpen={show} initialFocusRef={firstField}>
                  <form onSubmit={addCard}>
                    <Textarea
                      ref={firstField}
                      className={styles.textArea}
                      value={cardText}
                      onChange={updateCardText}
                      placeholder="Enter a title for this card..."
                    />
                    <div>
                      <Button variantColor="green" type="submit">
                        Add Card
                      </Button>
                      <CloseButton onClick={hideCollapse} />
                    </div>
                  </form>
                </Collapse>
              </div>
            )}
          </NaturalDragAnimation>
        )}
      </Draggable>
    );
};

export default List;