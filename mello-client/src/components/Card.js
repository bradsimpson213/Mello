import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styles from './Card.module.css';

const Card = (props) => {

    return (
      <Draggable draggableId={props.card.id} index={props.index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={styles.cardHolder}
          >
            <h4>{props.card.content}</h4>
          </div>
        )}
      </Draggable>
    );
};

export default Card;