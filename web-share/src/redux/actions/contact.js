import * as api from '../../config/api';

import {
  IS_LOADING_CONTACT_LIST,
  IS_FINISHED_CONTACT_LIST_LOADING,
} from '../actionTypes/contact';

const apiUrl = api.apiUrl;

export const loadContacts = (data) => (dispatch) => {
  const url = `${apiUrl}/member/search?search_key=${data.search_key}`;

  dispatch({ type: IS_LOADING_CONTACT_LIST });
  api
    .GET(url)
    .then((res) => {
      dispatch(loadContactsSuccess(res.members));
    })
    .catch((error) => {
      console.log(error);
      dispatch(loadContactsSuccess([]));
    });
};

export const loadContactsSuccess = (payload) => ({
  type: IS_FINISHED_CONTACT_LIST_LOADING,
  payload,
});
