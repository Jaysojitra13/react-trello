export const initialState = {
  trello: [
    {
      cardId: 1,
      cardTitle: "Card 1",
      tasks: [
        {
          id: 1,
          title: "Task 1",
          color: "#9b00fa",
          isEdit: 0
        },
        {
          id: 2,
          title: "Task 2",
          color: "#9b00fa",
          isEdit: 0
        }
      ]
    },
    {
      cardId: 2,
      cardTitle: "Card 2",
      tasks: [
        {
          id: 1,
          title: "Task 1",
          color: "#9b00fa",
          isEdit: 0
        },
        {
          id: 2,
          title: "Task 2",
          color: "#9b00fa",
          isEdit: 0
        }
      ]
    },
    // {
    //   cardId: 3,
    //   cardTitle: "Card 3",
    //   tasks: []
    // },
  ]
}

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'add_task':
      for (let card of state.trello) {
        if (card.cardId === action.cardId) {
          card.tasks.push({
            id: card.tasks.length + 1,
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
            console.log("taskINdex ", taskIndex, action.title);
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

    case 'add_card':
      state.trello.push({
        cardId: state.trello.length + 1,
        cardTitle: 'New Card',
        tasks: []
      });
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

    default:
      return state
  }
  // return state;
}

export default rootReducer;