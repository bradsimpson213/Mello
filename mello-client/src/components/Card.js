import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  Button,
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
    
    return (
      <Draggable draggableId={props.card.id} index={props.index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={styles.cardHolder}
          >
            {/* <h4>{props.card.content}</h4> */}
            <Button onClick={onOpen}>{props.card.content}</Button>

            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{props.card.content}</ModalHeader>
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