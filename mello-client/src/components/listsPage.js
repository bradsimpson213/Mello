import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import { baseUrl } from "../config";
import { buildBoardOrg } from "../utils";
import styles from './ListsPage.module.css';

const ListsPage = () => {
    const [show, toggleShow] = useToggle(false);
    const [listText, updateListText, resetListText] = useInputState();
    const [hidden, toggleHidden] = useToggle(false);
    
    const { boardId } = useParams()
    const { boardOrg, setBoardOrg, token } = useContext(appContext);
   
   
     //THIS USE EFFECT GETS BOARDS LISTS/CARDS (ONLY ONCE ON MOUNT)
    useEffect(() => {
        (async () => {
            const res = await fetch(`${baseUrl}/boards/details/${boardId}`);
        const data = await res.json();
        const { board, cards, lists } = data;
        const loadBoardOrg = buildBoardOrg(board, cards, lists);
        console.log(loadBoardOrg);
        setBoardOrg(loadBoardOrg);
       
        })();
    }, [boardId]);
    
    
    const addList = (e) => {
        e.preventDefault();
        //need to have or get next available list ID from server
        const newListId = `list-${boardOrg.listOrder.length + 1}`;
        const newList = { id: newListId, title: listText, cardIds: [] };
        const newBoardOrg = {
          ...boardOrg,
          lists: {
            ...boardOrg.lists,
            [newListId]: newList,
          },
        };
        newBoardOrg.listOrder.push(newListId);
        setBoardOrg(newBoardOrg);
        saveList(newList, newBoardOrg.board);
        hideCollapse();
    };

    const saveList = async (newList, boardInfo) => {
        const res = await fetch(`${baseUrl}/lists/create`,
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                },
            body: JSON.stringify({ newList: newList, board: boardInfo }),
            }
        );
        const data = res.json();
        if (data.error) {
            alert("Error saving new List to Database.");
        };
    };

    const saveBoard = async(newBoard) => {
        const { board, lists, listOrder} = newBoard
        const res = await fetch(`${baseUrl}/boards/save`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify({ board, listOrder, lists }),
          }
        );
        const data = res.json();
        if (data.error) {
          alert("Error saving new List to Database.");
        };
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
            saveBoard(newContext);
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
            saveBoard(newContext);
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
        saveBoard(newContext);
    };

    return (
      <>
        <NavBar2 />
        <NavBar3 />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {(provided) => (
              <div
                className={styles.listsContainer}
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ backgroundImage: `url(${boardOrg.board.boardImage})` }}
              >
                {boardOrg.listOrder.map((listId, index) => {
                  const list = boardOrg.lists[listId];
                  const cards = list.cardIds.map(
                    (cardId) => boardOrg.cards[cardId]
                  );
                  return (
                    <List
                      key={list.id}
                      list={list}
                      cards={cards}
                      index={index}
                    />
                  );
                })}
                {provided.placeholder}
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
                  <Collapse
                    className={styles.collapseList}
                    mt={4}
                    isOpen={show}
                  >
                    <form onSubmit={addList}>
                      <Input
                        className={styles.newListInput}
                        value={listText}
                        onChange={updateListText}
                        placeholder="Enter list title..."
                      />
                      <div>
                        <Button variantColor="green" type="submit">
                          Add List
                        </Button>
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
};

export default ListsPage;