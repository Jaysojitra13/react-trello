import React from "react";
import TrelloCard from "./TrelloCard";

const styles = {
  container: {
    backgroundColor: '#ccc',
    borderRadius: 3,
    width: 300,
    padding: 8
  }
};

const TrelloList = ({ title }) => {
  return (
    <div style={styles.container}>
      <h1> { title } </h1>
      <TrelloCard />
    </div>
  )
};

export default TrelloList;