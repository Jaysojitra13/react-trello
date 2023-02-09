import React from 'react'
import '../App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function Card({ cardId, cardTitle, tasks, addTask }) {
  return (
    <div className="col-md-4 border-solid border-radius ml-10">
      <h3>{cardTitle}</h3>
      <div className="tasklist">
        {
          tasks.length ? 
            tasks.map((t) => (
              <p 
                className="border-solid border-radius"
                key={t.id}
              >
                {t.title}
              </p>
            ))
            : 
            <p>Please add tasks</p>
            
        }
        <div className='plusButton'>
          <button 
            className='btn btn-info'
            onClick={() => addTask(cardId)}
          >
            <FontAwesomeIcon icon={faPlus} color="white" /> 
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card;