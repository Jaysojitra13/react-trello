import React, { useState, useEffect, useReducer } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { store } from '../store/store';
import '../App.css';
import Card from './Card';
import { AddTask, SaveTask, AddCard, RemoveCard } from '../store/actions/rootAction';
import rootReducer, { initialState } from '../store/reducers/rootReducer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function Cards() {
  let trello = useSelector((state) => state.trello);

  const [state, dispatch] = useReducer(rootReducer, initialState);

  console.log("123 ==> ", trello);

  function addTask(cardId) {
      dispatch({...AddTask(), cardId, title: 'Task 3' });
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
                        addTask={addTask}
                        saveTask={saveTask}
                        removeCard={removeCard}
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