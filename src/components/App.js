import React, { useReducer } from "react";
import TrelloList from "./TrelloList";
import listReducer, { initialState } from "../store/reducers/listReducer";

function App() {
  const [state, dispatch] = useReducer(listReducer, initialState);

  console.log("asdf => ", state);
  return (
    <div className="App">
      <h1 className="title">React Trello</h1>
      <div style={styles.container}>
        {state.map((list) => (
          <TrelloList key={list.id} title={list.title} cards={list.cards} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
  },
};
export default App;
