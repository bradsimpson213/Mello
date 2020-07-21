import React, { useContext } from 'react';
import {
  Button,
  CloseButton,
  Collapse,
  Input,
} from '@chakra-ui/core';
import useToggle from './hooks/useToggle';
import useInputState from './hooks/useInputState';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import NavBar2 from './navbars/NavBar2';
import NavBar3 from './navbars/NavBar3';
import List from './List';
import appContext from '../Context';
import styles from './ListsPage.module.css';

const ListsPage = () => {
    const [show, toggleShow] = useToggle(false);
    const [listText, updateListText, resetListText] = useInputState();
    const [hidden, toggleHidden] = useToggle(false);

    const { boardOrg, setBoardOrg } = useContext(appContext);

    const addList = (e) => {
        e.preventDefault();
        const newListId = `list-${boardOrg.listOrder.length + 1}`;
         const newList = {
           id: newListId,
           title: listText,
           cardIds: [],
         };
        
        const newBoardOrg = {
          ...boardOrg,
          lists: {
            ...boardOrg.lists,
            [newListId]: newList,
          },
        };
        newBoardOrg.listOrder.push(newListId);
        console.log(newBoardOrg);
        setBoardOrg(newBoardOrg);
        hideCollapse();
    };


    const hideCollapse = () => {
        resetListText();
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
        const { destination, source, draggableId, type } = result;
        //Chekcs to make sure something was actually moved to a new spot
        if (!destination) {
            return;
        }; //Card wasn't placed on a droppable area
        if ( destination.droppableId === source.droppableId && 
            destination.index === source.index) {
            return;
        }; //Card start and end was same location

        //If list order changes the below code block runs
        if(type === "list") {
            const newListOrder = Array.from(boardOrg.listOrder);
            newListOrder.splice(source.index, 1);
            newListOrder.splice(destination.index, 0, draggableId);
            const newContext = {
                ...boardOrg,
                listOrder: newListOrder,
            };
            setBoardOrg(newContext);
            return;
        };

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
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {(provided) => (
              <div className={styles.listsContainer} 
                {...provided.droppableProps}
                ref={provided.innerRef}>
                    {boardOrg.listOrder.map((listId, index) => {
                        const list = boardOrg.lists[listId];
                        const cards = list.cardIds.map(
                        (cardId) => boardOrg.cards[cardId]
                        );
                        return <List key={list.id} list={list} cards={cards} index={index} />;
                        })}
                    {provided.placeholder}
                <div className={ styles.newList }>
                  <Button
                    className={ styles.newListButton }
                    leftIcon="add"
                    variantColor="darkgray"
                    variant="outline"
                    isDisabled={hidden}
                    onClick={openCollapse}
                  >
                    Add another list
                  </Button>
                  <Collapse
                    className={ styles.collapseList }
                    mt={4}
                    isOpen={show}
                  >
                    <form onSubmit={ addList }>
                      <Input
                        className={ styles.newListInput }
                        value={ listText }
                        onChange={updateListText}
                        placeholder="Enter list title..."
                      />
                      <div>
                        <Button variantColor="green" type="submit" >Add List</Button>
                        <CloseButton onClick={hideCollapse} />
                      </div>
                    </form>
                  </Collapse>
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </>
    );
}

export default ListsPage;