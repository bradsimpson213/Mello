import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  Button,
  Editable,
  EditablePreview,
  EditableInput,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
} from "@chakra-ui/core";
import styles from './Card.module.css';

const Card = (props) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [cardTitle, setCardTitle] = useState(props.card.details)
    
    return (
      <Draggable draggableId={props.card.id} index={props.index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={styles.cardHolder}
            onClick={onOpen}
          >
            <h4>{cardTitle}</h4>
            {/* <Button onClick={onOpen}>{props.card.content}</Button> */}

            <Modal
              blockScrollOnMount={false}
              size="xl"
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  <Editable
                    defaultValue="Card title..."
                    value={cardTitle}
                  >
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text fontWeight="bold" mb="1rem">
                    You can scroll the content behind the modal
                  </Text>
                </ModalBody>
                <ModalFooter>
                  <Button variantColor="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button variant="ghost">Secondary Action</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        )}
      </Draggable>
    );
};

export default Card;