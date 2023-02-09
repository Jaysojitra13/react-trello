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
          priority: "p1",
        },
        {
          id: 2,
          title: "Task 2",
          color: "#9b00fa",
          priority: "p2"
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
          priority: "p1"
        },
        {
          id: 2,
          title: "Task 2",
          color: "#9b00fa",
          priority: "p2"
        }
      ]
    },
    {
      cardId: 3,
      cardTitle: "Card 3",
      tasks: []
    },
  ]
}

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'add_task':
      console.log("In reduz ", action);
      for (let card of state.trello) {
        if (card.cardId === action.cardId) {
          console.log("In reduz ", card.tasks);
          card.tasks.push({
            id: card.tasks.length + 1,
            title: "task 3",
            color: "#9b00fa",
          })
          console.log("In reduz ", card.tasks);
        }
      }

      // const cardFound = state.trello.find(t => t.cardId === action.cardId);
      // if (cardFound) {
      //   cardFound.tasks.push({
      //     id: cardFound.tasks.length + 1,
      //     title: "task 3",
      //     color: "#9b00fa",
      //   })
      // }
      return {
        ...state,
        trello: state.trello
      }
    default:
      return state
  }
  // return state;
}

export default rootReducer;