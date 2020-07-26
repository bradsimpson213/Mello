import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import NaturalDragAnimation from "natural-drag-animation-rbdnd";
import {
  Button,
  Editable,
  EditablePreview,
  EditableInput,
  Input,
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
    const [cardTitle, setCardTitle] = useState(props.card.title)
    
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
                  <ModalHeader>
                    <Editable
                      defaultValue="Card title..."
                      value={cardTitle}
                      onChange={setCardTitle}
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
                    <Input type="color" />
                    <Input type="text" />
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
          </NaturalDragAnimation>
        )}
      </Draggable>
    );
};

export default Card;