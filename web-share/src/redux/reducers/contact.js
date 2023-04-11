import {
  IS_LOADING_CONTACT_LIST,
  IS_FINISHED_CONTACT_LIST_LOADING,
} from '../actionTypes/contact.js';

// The initial state of the App
export const initialState = {
  loading: false,
  contacts: [],
};

const contact = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING_CONTACT_LIST:
      return {
        ...state,
        loading: true,
      };
    case IS_FINISHED_CONTACT_LIST_LOADING:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default contact;
