import React, { useState, useEffect, useReducer } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { store } from '../store/store';
import '../App.css';
import Card from './Card';
import { AddTask } from '../store/actions/rootAction';
import rootReducer, { initialState } from '../store/reducers/rootReducer';
function Cards() {
  let trello = useSelector((state) => state.trello);

  const [state, dispatch] = useReducer(rootReducer, initialState);

  console.log("123 ==> ", trello);

  function addTask(cardId) {
      dispatch({...AddTask(), cardId, title: 'Task 3' });
  }

  return (
    <div className='container'>
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
                  />
                ))
              }
            </div>
          ) : (
            <h1>No card found</h1>
          )
        }
        
      </div>
  )
}

export default Cards;