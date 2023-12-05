import React, { useReducer } from "react";
import { useSelector } from "react-redux";
import TrelloList from "./TrelloList";
import listReducer, { initialState } from "../store/reducers/listReducer";
import TrelloActionButton from "./TrelloActionButton";

const App = () => {
  let trello = useSelector((state) => state.lists);

  return (
    <div className="App">
      <h1 className="title" style={{ textAlign: "center " }}>
        React Trello
      </h1>
      <div style={styles.container}>
        {trello.map((list) => (
          <TrelloList key={list.id} title={list.title} cards={list.cards} />
        ))}
        <TrelloActionButton list />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
  },
};
export default App;
