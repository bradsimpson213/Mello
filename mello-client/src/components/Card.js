import React, { useState, useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import NaturalDragAnimation from "natural-drag-animation-rbdnd";
import appContext from "../Context";
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
import { baseUrl } from "../config";
import styles from './Card.module.css';

const Card = (props) => {
    const [show, toggleShow] = useToggle(false);
    const [hidden, toggleHidden] = useToggle(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [cardTitle, setCardTitle] = useState(props.card.title);
    const [cardDetail, updateCardDetail] = useInputState(props.card.detail ? props.card.detail : '');
    const [cardColor, updateCardColor] =useInputState(props.card.color ? props.card.color : '');

    const { token } = useContext(appContext);

    console.log(props);

    const saveCardName = async() => {
      
      const cardIdStr = props.card.id.slice(5);
      const cardId = parseInt(cardIdStr);
     
      const res = await fetch(`${baseUrl}/cards/title/${cardId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ cardId, cardTitle }),
      });
    };

    const saveCardDetail = async() => {

      const cardIdStr = props.card.id.slice(5);
      const cardId = parseInt(cardIdStr);

      const res = await fetch(`${baseUrl}/cards/details/${cardId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ cardColor }),
      });
    };
    

    const saveCard = async() => {

      const cardIdStr = props.card.id.slice(5);
      const cardId = parseInt(cardIdStr);

      const res = await fetch(`${baseUrl}/cards/color/${cardId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ cardColor }),
      });
      onClose();
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
              style={ style }
              className={styles.cardHolder}

              onClick={onOpen}
            >
                <h4 style={{'color': `${cardColor ? cardColor : 'black'}`} }>{cardTitle}</h4>
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
                        <form>
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
                        <FormLabel htmlFor="color" fontWeight="bold" fontSize="lg" mb="1rem">Card Text Color:</FormLabel>
                        <Input id="color" className={styles.colorPick} type="color" value={ cardColor } onChange={ updateCardColor } />
                      </FormControl>
                    </form>
                  </ModalBody>
                  <ModalFooter >
                      <Button style={{'marginRight': '15px'}} onClick= { saveCard } variantColor="green">Save Card</Button>
                      <Button style={{'marginRight': '150px'}} variantColor="blue" mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button style={{ 'marginRight': '40px' }}variantColor="red" onClick={ deleteCard }>Delete Card</Button>
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