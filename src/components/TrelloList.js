import React from "react";
import TrelloCard from "./TrelloCard";
import TrelloActionButton from "./TrelloActionButton";
import { Droppable } from "react-beautiful-dnd";
const styles = {
  container: {
    backgroundColor: "#dfe3e6",
    borderRadius: 3,
    width: 300,
    padding: 8,
    marginRight: 8,
    height: "100%",
  },
};

const TrelloList = ({ title, cards, listId }) => {
  return (
    <Droppable droppableId={listId.toString()}>
      {(provided) => {
        <div
          ref={provided.innerRef}
          style={styles.container}
          {...provided.droppableProps}
        >
          <h1 style={{ textAlign: "center" }}> {title} </h1>
          {cards?.map((card, index) => (
            <TrelloCard
              key={card.id}
              text={card.text}
              id={card.id}
              index={index}
            />
          ))}
          <TrelloActionButton listId={listId} />
          {provided.placeholder}
        </div>;
      }}
    </Droppable>
  );
};

export default TrelloList;
