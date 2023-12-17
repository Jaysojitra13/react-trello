import { CONSTANTS } from "../actions";

export const addList = (title) => {
  return {
    type: CONSTANTS.ADD_LIST,
    payload: title,
  };
};

export const addCard = (listId, title) => {
  return {
    type: CONSTANTS.ADD_CARD,
    payload: { title, listId },
  };
};
