import React, { useState, useReducer } from 'react'
import '../App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck, faClose, faEdit } from '@fortawesome/free-solid-svg-icons'
import rootReducer, { initialState } from '../store/reducers/rootReducer';
import { SaveTask } from '../store/actions/rootAction';
import { Droppable, Draggable } from "react-beautiful-dnd";

function Card({ cardId, isCardEdit, cardTitle, tasks, addTask, removeCard, removeTask, editTask, editCardTitle, saveCardTitle }) {

  const [input, setInput] = useState('');
  const [newCardTitle, setCardTitle] = useState('');

  const [state, dispatch] = useReducer(rootReducer, initialState);

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleCardTitleChange = e => {
    setCardTitle(e.target.value)
  }

  function saveTask(cardId, input, taskId, oldTitle) {
    let title = oldTitle;
    if (input) {
      title = input
    }
    dispatch({...SaveTask(), cardId, title, taskId });
    setInput('')
  }

  return (
    <div className="col-md-4 border-solid border-radius ml-10 card">
      {
        isCardEdit ? 
        <div className='edit-card-title'>
          <input
            type="text"
            name="card-title"
            placeholder={cardTitle || 'Enter Card Title'}
            onChange={handleCardTitleChange}
          />

          <button
            className='btn btn-success saveButton'
            onClick={() => saveCardTitle(cardId, newCardTitle, cardTitle)}
          >
            <FontAwesomeIcon className='saveIcon' icon={faCheck} color="white"/>
          </button>
        </div>
        :
          <h3 onClick={() => editCardTitle(cardId)}>{cardTitle}</h3>
      }

      <Droppable droppableId={cardId.toString()}>
        {
          (provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <div 
                className="tasklist"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {
                  tasks.length ? 
                    tasks.map((t, index) => {
                      if (t.isEdit) {
                        return (
                          <div className='task-add'>
                            <input
                              className='input-edit-add'
                              type="text"
                              name="text"
                              key={t.id}
                              placeholder={t.title || ''}
                              onChange={handleChange}
                            ></input>
                            <button
                              className='btn btn-success saveButton'
                              onClick={() => saveTask(cardId, input, t.id, t.title)}
                            >
                              <FontAwesomeIcon className='saveIcon' icon={faCheck} color="white"/> 
                            </button>
                          </div>
                        )
                        // <p className="border-solid border-radius">Hello</p>
                      } else {
                        return (
                          <Draggable draggableId={`${cardId}${t.id.toString()}`} index={+`${index}`} key={t.id}>
                            {
                              (provided) => (
                                <div 
                                  className='taskDetail'
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <p 
                                    className="taskTitle border-radius overflow-wrap-break"
                                    key={t.id}
                                    
                                  >
                                    {t.title}
                                  </p>
                                  
                                  <div className='editTaskSvg' onClick={() => editTask(cardId, t.id)}>
                                    <FontAwesomeIcon  icon={faEdit} color="white" /> 
                                  </div>
                                  
                                  <button className='btn btn-dark deleteTaskButton' onClick={() => removeTask(cardId, t.id)}>
                                    <FontAwesomeIcon className='deleteTaskSvg' icon={faClose} color="white"/> 
                                  </button>
                                </div>
                              )
                            }

                          </Draggable>
                        )
                      }
                    })
                    : 
                    <p>No tasks</p>
                }
                {provided.placeholder}
              </div>
              <div className='plusButton'>
                <button 
                  className='btn btn-info'
                  onClick={() => addTask(cardId)}
                >
                  <FontAwesomeIcon icon={faPlus} color="white" /> 
                </button>
                <button className='btn btn-danger' onClick={() => removeCard(cardId)}>
                  Remove Task
                </button>
              </div>
          </div>
          )
        }
      </Droppable>
    </div>
  )
}

export default Card;