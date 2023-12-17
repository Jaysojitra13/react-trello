import { CONSTANTS } from "../actions";

let cardId = 4;

export const initialState = [
  {
    id: 0,
    title: "Last Episode",
    cards: [
      {
        id: 0,
        text: "First Card",
      },
      {
        id: 1,
        text: "We creaed static and second card and another card",
      },
    ],
  },
  {
    id: 1,
    title: "Current Episode",
    cards: [
      {
        id: 0,
        text: "Current -- First Card",
      },
      {
        id: 1,
        text: "Current -- We creaed static and second card and another card",
      },
      {
        id: 2,
        text: "Current -- We creaed static and second card and another card",
      },
    ],
  },
];

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST:
      const newList = {
        id: state.length + 1,
        cards: [],
        title: action.payload,
      };
      return [...state, newList];
    case CONSTANTS.ADD_CARD:
      const newCard = {
        id: cardId,
        text: action.payload.title,
      };

      cardId += 1;

      const newState = state.map((list) => {
        if (list.id == action.payload.listId) {
          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        } else {
          return list;
        }
      });

      return newState;
      console.log("herer", action);
      return state;
    default:
      return state;
  }
};

export default listReducer;
