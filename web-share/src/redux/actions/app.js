import { APP_START, CHANGE_LOCALE } from '../actionTypes/app.js';

export const appStart = () => {
  return {
    type: APP_START,
  };
};

export const changeLocale = (locale) => {
  return {
    type: CHANGE_LOCALE,
    payload: {
      locale,
    },
  };
};
