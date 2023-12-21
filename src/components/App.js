import React, { useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import TrelloList from "./TrelloList";
import listReducer, { initialState } from "../store/reducers/listReducer";
import TrelloActionButton from "./TrelloActionButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "../store/actions";
import styled from "styled-components";

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const App = () => {
  let trello = useSelector((state) => state.lists);

  let dispath = useDispatch();

  const onDrageEnd = (result) => {
    console.log("Drag done", result);
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }

    dispath(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  return (
    <DragDropContext onDragEnd={onDrageEnd}>
      <div className="App">
        <h1 className="title" style={{ textAlign: "center " }}>
          React Trello
        </h1>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <ListContainer ref={provided.innerRef} {...provided.droppableProps}>
              {trello.map((list, index) => (
                <TrelloList
                  listId={list.id}
                  key={list.id}
                  title={list.title}
                  cards={list.cards}
                  index={index}
                />
              ))}
              <TrelloActionButton list />
            </ListContainer>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};
export default App;
