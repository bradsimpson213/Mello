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

    const { boardOrg } = useContext(appContext);

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

    const onDragEnd = () => {
        //TODO
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