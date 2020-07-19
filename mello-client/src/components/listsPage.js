import React from 'react';
import {
  Button,
  CloseButton,
  Collapse,
  Input,
} from "@chakra-ui/core";
import useToggle from "./hooks/useToggle";
import useInputState from "./hooks/useInputState";
import NavBar2 from './navbars/NavBar2';
import NavBar3 from './navbars/NavBar3';
import List from './List';
import styles from './ListsPage.module.css';

const ListsPage = () => {
    const [show, toggleShow] = useToggle(false);
    const [text, updateText, resetText] = useInputState();
    const [hidden, toggleHidden] = useToggle(false);

    const saveList = () => {};


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
      <>
        <NavBar2 />
        <NavBar3 />
        <div className={styles.listsContainer}>
          <List />
          <div>
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
      </>
    );
}

export default ListsPage;