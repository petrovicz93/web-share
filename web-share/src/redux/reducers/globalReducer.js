import { CHANGE_LOCALE } from '../actionTypes/app.js';

// The initial global state of the App
export const initialState = {
  locale: 'en-US',
};

const global = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return {
        ...state,
        locale: action.payload.locale,
      };
    default:
      return state;
  }
};

export default global;
