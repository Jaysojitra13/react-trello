import React, { useReducer } from "react";
import { useSelector } from "react-redux";
import TrelloList from "./TrelloList";
import listReducer, { initialState } from "../store/reducers/listReducer";
import TrelloActionButton from "./TrelloActionButton";
import { DragDropContext } from "react-beautiful-dnd";
const App = () => {
  let trello = useSelector((state) => state.lists);

  const onDrageEnd = () => {
    console.log("Drag done");
  };

  return (
    <DragDropContext onDragEnd={onDrageEnd}>
      <div className="App">
        <h1 className="title" style={{ textAlign: "center " }}>
          React Trello
        </h1>
        <div style={styles.container}>
          {trello.map((list) => (
            <TrelloList
              listId={list.id}
              key={list.id}
              title={list.title}
              cards={list.cards}
            />
          ))}
          <TrelloActionButton list />
        </div>
      </div>
    </DragDropContext>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
  },
};
export default App;
