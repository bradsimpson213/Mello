import React, { useContext } from 'react';
import {
  Button,
  CloseButton,
  Collapse,
  Input,
} from '@chakra-ui/core';
import useToggle from './hooks/useToggle';
import useInputState from './hooks/useInputState';
import { DragDropContext } from 'react-beautiful-dnd';
import NavBar2 from './navbars/NavBar2';
import NavBar3 from './navbars/NavBar3';
import List from './List';
import appContext from '../Context';
import styles from './ListsPage.module.css';

const ListsPage = () => {
    const [show, toggleShow] = useToggle(false);
    const [text, updateText, resetText] = useInputState();
    const [hidden, toggleHidden] = useToggle(false);

    const { boardOrg, setBoardOrg } = useContext(appContext);

    const saveList = () => {
        //TODO
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

    const onDragStart = () => {
        //add drag item tilt here will need to add onDrafStert={onDragStart} to component
    };

     const onDragEnd = (result) => {
        //cancel drag item tilt here
        const { destination, source, draggableId } = result;
        //Chekcs to make sure something was actually moved to a new spot
        if (!destination) {
            return;
        }; //Card wasn't placed on a droppable area
        if ( destination.droppableId === source.droppableId && 
            destination.index === source.index) {
            return;
        }; //Card start and end was same location

        // Moving inside the same list:
        const start = boardOrg.lists[source.droppableId];
        const finish = boardOrg.lists[destination.droppableId]
       
        if (start === finish) {
            const newCardIds = Array.from(start.cardIds)
            newCardIds.splice(source.index, 1);
            newCardIds.splice(destination.index, 0, draggableId);

            const newList = {
                ...start,
                cardIds: newCardIds,
            };

            const newContext = {
                ...boardOrg,
                lists: {
                    ...boardOrg.lists,
                    [newList.id]: newList,
                },
            };
            setBoardOrg(newContext);
            return;
        };

        // Moving from list to list:
        const startCardIds = Array.from(start.cardIds);
        startCardIds.splice(source.index, 1);
        const newStart = {
            ...start,
            cardIds: startCardIds,
        };

        const finishCardIds = Array.from(finish.cardIds);
        finishCardIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            cardIds: finishCardIds,
        };
        const newContext = {
            ...boardOrg,
            lists: {
            ...boardOrg.lists,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
            },
        };
        setBoardOrg(newContext);
    };

    return (
      <>
        <NavBar2 />
        <NavBar3 />
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={styles.listsContainer}>
            {boardOrg.listOrder.map((listId) => {
              const list = boardOrg.lists[listId];
              const cards = list.cardIds.map(
                (cardId) => boardOrg.cards[cardId]
              );
              return <List key={list.id} list={list} cards={cards} />;
            })}
            <div className={styles.newList}>
              <Button
                className={styles.newListButton}
                leftIcon="add"
                variantColor="darkgray"
                variant="outline"
                isDisabled={hidden}
                onClick={openCollapse}
              >
                Add another list
              </Button>
              <Collapse className={styles.collapseList} mt={4} isOpen={show}>
                <form onSubmit={saveList}>
                  <Input
                    className={styles.newListInput}
                    value={text}
                    onChange={updateText}
                    placeholder="Enter list title..."
                  />
                  <div>
                    <Button variantColor="green">Add List</Button>
                    <CloseButton onClick={hideCollapse} />
                  </div>
                </form>
              </Collapse>
            </div>
          </div>
        </DragDropContext>
      </>
    );
}

export default ListsPage;