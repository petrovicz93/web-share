import * as api from '../../config/api';
import {
  GET_MEMBER_DATA_SUCCEEDED,
  GET_MEMBER_DATA_FAILED,
  SAVE_SIGN_UP_SESSION,
  CLEAR_SIGN_UP_SESSION,
  MEMBER_LOGIN_SUCCEEDED,
  MEMBER_LOGIN_FAILED,
  MEMBER_LOGOUT_SUCCEEDED,
  MEMBER_LOGOUT_FAILED,
  GET_MEMBER_LOCATION_INFO_START,
  GET_MEMBER_LOCATION_INFO_SUCCEEDED,
  GET_MEMBER_LOCATION_INFO_FAILED,
  MEMBERS_LOAD_SUCCESS,
  MEMBERS_LOADING,
} from '../actionTypes/member.js';

const apiUrl = api.apiUrl;

export const saveSignUpSession = (payload) => ({
  type: SAVE_SIGN_UP_SESSION,
  payload,
});
export const clearSignUpSession = (payload) => ({
  type: CLEAR_SIGN_UP_SESSION,
  payload,
});
export const getMemberLocationInfoStart = (payload) => ({
  type: GET_MEMBER_LOCATION_INFO_START,
  payload,
});
export const getMemberLocationInfoSucceeded = (payload) => ({
  type: GET_MEMBER_LOCATION_INFO_SUCCEEDED,
  payload,
});
export const getMemberLocationInfoFailed = (payload) => ({
  type: GET_MEMBER_LOCATION_INFO_FAILED,
});

export const login = (formData) => (dispatch) => {
  const url = `${apiUrl}/member/login`;
  api
    .POST(url, formData, { 'Content-Type': 'application/json' })
    .then((res) => {
      dispatch(memberLoginSucceeded(res));
      dispatch(getMember());
    })
    .catch((err) => {
      dispatch(memberLoginFailed);
    });
};

export const logout = (formData) => (dispatch) => {
  const url = `${apiUrl}/member/logout`;

  api
    .POST(url, formData, { 'Content-Type': 'application/json' })
    .then((res) => {
      dispatch(memberLogoutSucceeded(res));
    })
    .catch((err) => {
      dispatch(memberLogoutFailed);
    });
};

export const getMember = () => (dispatch) => {
  const url = `${apiUrl}/valid-session`;
  api
    .GET(url)
    .then((res) => {
      if (res.member_id) {
        dispatch(getMemberDataSucceeded(res));
      } else {
        dispatch(getMemberDataFailed());
      }
    })
    .catch((error) => {
      dispatch(getMemberDataFailed());
      console.error(error);
    });
};

// Get Member Location Information
export const getMemberLocationInfo = () => (dispatch) => {
  const url = `${apiUrl}/api/client/info`;
  dispatch(getMemberLocationInfoStart());
  api
    .GET(url)
    .then((res) => {
      dispatch(getMemberLocationInfoSucceeded(res));
    })
    .catch((error) => {
      dispatch(getMemberLocationInfoFailed(error));
      console.error(error);
    });
};

export const getMembers = (data) => (dispatch) => {
  const url = `${apiUrl}/member/search?exclude_group_id=${data.group_id}&search_key=${data.search_key}`;
  dispatch({ type: MEMBERS_LOADING });
  api
    .GET(url)
    .then((res) => {
      dispatch(loadMemebersSuccess(res.members));
    })
    .catch((error) => {
      console.log(error);
      dispatch(loadMemebersSuccess([]));
    });
};

export const memberLoginSucceeded = (payload) => ({
  type: MEMBER_LOGIN_SUCCEEDED,
  payload,
});
export const memberLoginFailed = (payload) => ({
  type: MEMBER_LOGIN_FAILED,
  payload,
});
export const memberLogoutSucceeded = (payload) => ({
  type: MEMBER_LOGOUT_SUCCEEDED,
  payload,
});
export const memberLogoutFailed = (payload) => ({
  type: MEMBER_LOGOUT_FAILED,
  payload,
});
export const getMemberDataSucceeded = (payload) => ({
  type: GET_MEMBER_DATA_SUCCEEDED,
  payload,
});

export const getMemberDataFailed = () => ({
  type: GET_MEMBER_DATA_FAILED,
});
export const loadMemebersSuccess = (payload) => ({
  type: MEMBERS_LOAD_SUCCESS,
  payload,
});
