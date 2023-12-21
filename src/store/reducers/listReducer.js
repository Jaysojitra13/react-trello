import { CONSTANTS } from "../actions";

let cardId = 5;

export const initialState = [
  {
    id: `list-${0}`,
    title: "Last Episode",
    cards: [
      {
        id: `card-${0}`,
        text: "First Card",
      },
      {
        id: `card-${1}`,
        text: "We creaed static and second card and another card",
      },
    ],
  },
  {
    id: `list-${1}`,
    title: "Current Episode",
    cards: [
      {
        id: `card-${2}`,
        text: "Current -- First Card",
      },
      {
        id: `card-${3}`,
        text: "Current -- We creaed static and second card and another card",
      },
      {
        id: `card-${4}`,
        text: "Current -- We creaed static and second card and another card",
      },
    ],
  },
];

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST:
      const newList = {
        id: `list-${state.length + 1}`,
        cards: [],
        title: action.payload,
      };
      return [...state, newList];

    case CONSTANTS.ADD_CARD: {
      const newCard = {
        id: `card-${cardId}`,
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
    }
    case CONSTANTS.DROP_HAPPEN:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId,
      } = action.payload;
      const newState = [...state];

      // in the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state.find((list) => droppableIdStart === list.id);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      // different list
      if (droppableIdStart !== droppableIdEnd) {
        const listStart = state.find((list) => droppableIdStart === list.id);
        const card = listStart.cards.splice(droppableIndexStart, 1);
        const listEnd = state.find((list) => droppableIdEnd === list.id);
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }

      return newState;

    default:
      return state;
  }
};

export default listReducer;
