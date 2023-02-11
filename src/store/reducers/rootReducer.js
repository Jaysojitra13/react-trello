export const initialState = {
  trello: [
    {
      cardId: 1,
      cardTitle: "Planned",
      isEdit: 0,
      tasks: [
        {
          id: 11,
          title: "Task 1",
          color: "#9b00fa",
          isEdit: 0,
          uniqId: '1676074730655'
        },
        {
          id: 12,
          title: "Task 2",
          color: "#9b00fa",
          isEdit: 0,
          uniqId: '1676074730656'
        }
      ]
    },
    {
      cardId: 2,
      cardTitle: "In Progress",
      isEdit: 0,
      tasks: [
        {
          id: 21,
          title: "Task 21",
          color: "#9b00fa",
          isEdit: 0,
          uniqId: '1676074730657'
        },
        {
          id: 22,
          title: "Task 22",
          color: "#9b00fa",
          isEdit: 0,
          uniqId: '1676074730658'
        }
      ]
    },
  ]
}

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'add_task':
      for (let card of state.trello) {
        if (card.cardId === action.cardId) {
          card.tasks.push({
            id: +`${action.cardId}${card.tasks.length + 1}`,
            title: "",
            color: "#9b00fa",
            isEdit: 1
          })
        }
      }
      return {
        ...state,
        trello: state.trello
      }
    
    case 'save_task':
      if (action.title) {
        for (let card of state.trello) {
          if (card.cardId === action.cardId) {
            let taskIndex = card.tasks.findIndex(t => t.id === action.taskId);
            if (taskIndex !== -1) {
              card.tasks[taskIndex].title = action.title;
              card.tasks[taskIndex].isEdit = 0;
            } 
          }
        }
      }
      return {
        ...state,
        trello: state.trello
      }
    
    case 'edit_task':
      for (let card of state.trello) {
        if (card.cardId === action.cardId) {
          const foundTaskId = card.tasks.findIndex(t => t.id === action.taskId);
          if (foundTaskId !== -1) {
            card.tasks[foundTaskId].isEdit = 1;
          }
        }
      }

      return {
        ...state
      }

    case 'remove_task':
      for (let card of state.trello) {
        if (card.cardId === action.cardId) {
          card.tasks = card.tasks.filter(t => t.id !== action.taskId)
        }
      }

      return {
        ...state
      }

    case 'add_card':
      state.trello.push({
        cardId: state.trello.length + 1,
        cardTitle: 'New Card',
        tasks: [],
        isEdit: 1,
      });
      return {
        ...state
      }

    case 'edit_card_title':
      for (let card of state.trello) {
        if (card.cardId === action.cardId) {
          card.isEdit = 1;
        }
      }
      return {
        ...state
      }

    case 'save_card_title':
      for (let card of state.trello) {
        if (card.cardId === action.cardId) {
          card.cardTitle = action.title;
          card.isEdit = 0;
        }
      }
      return {
        ...state
      }

    case 'remove_card':
      const foundCardIndex = state.trello.findIndex(c => c.cardId === action.cardId);
      if (foundCardIndex !== -1) {
        state.trello.splice(foundCardIndex, 1);
      }
      return {
        ...state
      }
    
    case 'reorder_tasks':
      
      const sourceCardId = +action.source.droppableId;
      const destinationCardId = +action.destination.droppableId;

      const sourceTaskIndex = action.source.index;
      const destinationTaskIndex = action.destination.index;

      // Reorder within same card
      if (sourceCardId === destinationCardId) {
        for (let card of state.trello) {
          if (card.cardId === sourceCardId) {
            const [removed] = card.tasks.splice(sourceTaskIndex, 1);
            card.tasks.splice(destinationTaskIndex, 0, removed);
          }
        }
      } else {
        // reorder in different card
        let removed = null;
        for (let card of state.trello) {
          if (card.cardId === sourceCardId) {
            [removed] = card.tasks.splice(sourceTaskIndex, 1);
          }
        }
        for (let card of state.trello) {
          if (card.cardId === destinationCardId && removed) {
            card.tasks.splice(destinationTaskIndex, 0, removed);
          }
        }
      }
      return {
        ...state
      }
    default:
      return state
  }
}

export default rootReducer;