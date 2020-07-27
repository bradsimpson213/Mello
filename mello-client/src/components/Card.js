import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import NaturalDragAnimation from "natural-drag-animation-rbdnd";
import {
  Box,
  Button,
  CloseButton,
  Collapse,
  Divider,
  Editable,
  EditablePreview,
  EditableInput,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/core";
import useToggle from './hooks/useToggle';
import useInputState from './hooks/useInputState';
import styles from './Card.module.css';

const Card = (props) => {
    const [show, toggleShow] = useToggle(false);
    const [hidden, toggleHidden] = useToggle(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [cardTitle, setCardTitle] = useState(props.card.title);
    const [cardDetail, updateCardDetail] = useInputState(props.card.description);
    const [cardColor, updateCardColor] =useInputState(props.card.color);

    console.log(cardTitle, cardDetail, cardColor);

    const saveCardName = () => {

    };

    const saveCardDetail = () => {

    };

    const saveCard = () => {

    };

    const deleteCard = () => {

    };

    const hideCollapse = () => {
      toggleShow();
      toggleHidden();
    };

    const openCollapse = () => {
      toggleHidden();
      toggleShow();
    };

    return (
      <Draggable draggableId={props.card.id} index={props.index}>
        {(provided, snapshot) => (
          <NaturalDragAnimation
            style={provided.draggableProps.style}
            snapshot={snapshot}
          >
          {style => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={style}
              className={styles.cardHolder}
              onClick={onOpen}
            >
              <h4>{cardTitle}</h4>
              <Modal
                blockScrollOnMount={false}
                size="xl"
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent className={styles.modalContainer}>
                  <ModalHeader className={styles.modalTitle}>
                    <Editable
                      defaultValue="Card title..."
                      value={cardTitle}
                      onChange={setCardTitle}
                      onSubmit={saveCardName}
                    >
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text fontWeight="bold" fontSize="lg" mb="1rem">Card Description:</Text>
                    <Box className={styles.detailText} onClick={openCollapse} hidden={hidden}>{ cardDetail ? cardDetail : "Click to enter details..." }</Box>
                      <Collapse className={styles.collapseCard} isOpen={show}>
                        <form onSubmit={ saveCardDetail }>
                          <Textarea
                            className={styles.textArea}
                            value={cardDetail}
                            onChange={updateCardDetail}
                            placeholder="Enter details for this card..."
                          />
                          <div>
                            <Button className={styles.detailButton} variantColor="green" type="submit">
                              Save Description
                            </Button>
                            <CloseButton onClick={hideCollapse} />
                          </div>
                        </form>
                      </Collapse>
                    <Divider />
                    <form onSubmit={ saveCard }>
                      <FormControl>
                        <FormLabel htmlFor="color" fontWeight="bold" fontSize="lg" mb="1rem">Card Background:</FormLabel>
                        <Input id="color" className={styles.colorPick} type="color" value={ cardColor } onChange={ updateCardColor } />
                      </FormControl>
                    </form>
                  </ModalBody>
                  <ModalFooter >
                      <Button type="submit" variantColor="green">Save Card</Button>
                      <Button variantColor="blue" mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button variantColor="red" onClick={ deleteCard }>Delete Card</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>
          )}
          </NaturalDragAnimation>
        )}
      </Draggable>
    );
};

export default Card;