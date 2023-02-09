import React, { useReducer } from 'react'
import { useSelector } from 'react-redux'
import '../App.css';
import Card from './Card';
import { AddTask, SaveTask, AddCard, RemoveCard, RemoveTask, EditTask, EditCardTitle, SaveCardTitle } from '../store/actions/rootAction';
import rootReducer, { initialState } from '../store/reducers/rootReducer';

function Cards() {
  let trello = useSelector((state) => state.trello);

  const [state, dispatch] = useReducer(rootReducer, initialState);

  console.log("123 ==> ", trello);

  function addTask(cardId) {
      dispatch({...AddTask(), cardId });
  }

  function saveTask(cardId, input, taskId) {
    dispatch({...SaveTask(), cardId, title: input, taskId });
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
  
  return (
    <div className='container'>
      <div className='row'>
            {
              trello?.length ? (
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
                        saveTask={saveTask}
                        removeCard={removeCard}
                        removeTask={removeTask}
                        editTask={editTask}
                        editCardTitle={editCardTitle}
                        saveCardTitle={saveCardTitle}
                      />
                    ))
                  }
                </div>
              ) : (
                <h1>No card found</h1>
              )
            }
          <button 
            className='btn btn-info addCardButton'
            onClick={addCard}
          >
            Add Card
          </button>
      </div>
    </div>
  )
}

export default Cards;