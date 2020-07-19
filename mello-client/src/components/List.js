import React from 'react';
import useToggle from './hooks/useToggle';
import useInputState from './hooks/useInputState'
import { Button, CloseButton, Collapse, Editable,
     EditableInput, EditablePreview, Textarea } from '@chakra-ui/core';
import styles from './List.module.css';


const List = () => {
    const [show, toggleShow] = useToggle(false);
    const [text, updateText, resetText] = useInputState();
    const [hidden, toggleHidden] = useToggle(false);

    const saveCard = () => {

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
      <div className={styles.listHolder}>
        <Editable className={styles.listName} defaultValue="List Name...">
          <EditablePreview />
          <EditableInput />
        </Editable>
        <div className={styles.listCardArea}>
          <h3>Cards will go Here</h3>
        </div>
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