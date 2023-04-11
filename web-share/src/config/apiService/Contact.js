import * as api from '../api';
import {
  IS_LOADING_CONTACT_LIST,
  IS_FINISHED_CONTACT_LIST_LOADING,
} from '../../redux/actionTypes/contact';

// get contact list for logged in member
export const getContactList = () => {
  const url = `${apiUrl}/contacts`;
  return function (dispatch) {
    dispatch({
      type: IS_LOADING_CONTACT_LIST,
    });
    api
      .GET(url)
      .then((res) => {
        dispatch({
          type: IS_FINISHED_CONTACT_LIST_LOADING,
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: IS_FINISHED_CONTACT_LIST_LOADING,
          payload: [],
        });
      });
  };
};
