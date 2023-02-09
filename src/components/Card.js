import React, {useState} from 'react'
import '../App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck, faClose } from '@fortawesome/free-solid-svg-icons'

function Card({ cardId, cardTitle, tasks, addTask, saveTask, removeCard }) {
  const [input, setInput] = useState('');

  const handleChange = e => {
    setInput(e.target.value);
  };

  return (
    <div className="col-md-4 border-solid border-radius ml-10">
      <h3>{cardTitle}</h3>
      <div className="tasklist">
        {
          tasks.length ? 
            tasks.map((t) => {
              if (t.isEdit) {
                return (
                  <div className='task-add'>
                    <input
                      className='input-edit-add'
                      type="text"
                      name="text"
                      key={t.id}
                      onChange={handleChange}
                    ></input>
                    <button
                      className='btn btn-success saveButton'
                      onClick={() => saveTask(cardId, input, t.id)}
                    >
                      <FontAwesomeIcon className='saveIcon' icon={faCheck} color="white"/> 
                    </button>
                  </div>
                )
                // <p className="border-solid border-radius">Hello</p>
              } else {
                return (
                  <p 
                    className="border-solid border-radius overflow-wrap-break"
                    key={t.id}
                  >
                    {t.title}
                  </p>
                )
              }
            })
            : 
            <p>No tasks</p>
        }
        <div className='plusButton'>
          <button 
            className='btn btn-info'
            onClick={() => addTask(cardId)}
          >
            <FontAwesomeIcon icon={faPlus} color="white" /> 
          </button>
          <button className='btn btn-danger' onClick={() => removeCard(cardId)}>
            Remove Card
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card;