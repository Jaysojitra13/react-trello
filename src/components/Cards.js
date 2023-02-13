import React, { useReducer } from 'react'
import { useSelector } from 'react-redux'
import '../App.css';
import Card from './Card';
import { AddTask, AddCard, RemoveCard, RemoveTask, EditTask, EditCardTitle, SaveCardTitle, ReorderTasks } from '../store/actions/rootAction';
import rootReducer, { initialState } from '../store/reducers/rootReducer';
import { DragDropContext } from "react-beautiful-dnd";

function Cards() {
  let trello = useSelector((state) => state.trello);

  const [state, dispatch] = useReducer(rootReducer, initialState);

  function addTask(cardId) {
      dispatch({...AddTask(), cardId });
  }

  function addCard() {
    dispatch({...AddCard()});
  }

  function removeCard(cardId) {
    dispatch({...RemoveCard(), cardId});
  }

  function removeTask(cardId, taskId) {
    dispatch({...RemoveTask(), cardId, taskId});
  }

  function editTask(cardId, taskId) {
    dispatch({...EditTask(), cardId, taskId });
  }

  function editCardTitle(cardId, taskId) {
    dispatch({...EditCardTitle(), cardId });
  }

  function saveCardTitle(cardId, newCardTitle, oldCardTitle) {
    let title = oldCardTitle;
    if (newCardTitle) {
      title = newCardTitle
    }
    dispatch({...SaveCardTitle(), cardId, title });
  }
  
  const onDragEnd = result => {
    if (result?.source?.droppableId !== result?.destination?.droppableId || result?.source?.index !== result?.destination?.index) {
      dispatch({...ReorderTasks(), source: result.source, destination: result.destination });
    }
  };

  return (
    <div className='container'>
      <div className='row'>
            {
              trello?.length ? (
                <DragDropContext onDragEnd={onDragEnd}>
                  <div className="cards">
                    {
                      trello?.map((tObj) => (
                        <Card 
                          key={tObj.cardId}
                          cardId={tObj.cardId}
                          cardTitle={tObj.cardTitle}
                          tasks={tObj.tasks}
                          isCardEdit={tObj.isEdit}
                          addTask={addTask}
                          removeCard={removeCard}
                          removeTask={removeTask}
                          editTask={editTask}
                          editCardTitle={editCardTitle}
                          saveCardTitle={saveCardTitle}
                        />
                      ))
                    }
                  </div>
                </DragDropContext>
              ) : (
                <h1>No card found</h1>
              )
            }
          <button 
            className='btn btn-info addCardButton'
            onClick={addCard}
          >
            Add Task
          </button>
      </div>
    </div>
  )
}

export default Cards;