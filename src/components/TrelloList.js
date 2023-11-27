import React from "react";
import TrelloCard from "./TrelloCard";

const styles = {
  container: {
    backgroundColor: "#dfe3e6",
    borderRadius: 3,
    width: 300,
    padding: 8,
    marginRight: 8,
  },
};

const TrelloList = ({ title, cards }) => {
  return (
    <div style={styles.container}>
      <h1> {title} </h1>
      {cards?.map((card) => (
        <TrelloCard key={card.id} text={card.text} />
      ))}
    </div>
  );
};

export default TrelloList;
