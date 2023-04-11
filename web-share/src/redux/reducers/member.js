import {
  SAVE_SIGN_UP_SESSION,
  CLEAR_SIGN_UP_SESSION,
  MEMBER_LOGIN_SUCCEEDED,
  GET_MEMBER_DATA_SUCCEEDED,
  GET_MEMBER_DATA_FAILED,
  MEMBER_LOGOUT_SUCCEEDED,
  GET_MEMBER_LOCATION_INFO_START,
  GET_MEMBER_LOCATION_INFO_SUCCEEDED,
  GET_MEMBER_LOCATION_INFO_FAILED,
  MEMBERS_LOADING,
  MEMBERS_LOAD_SUCCESS,
} from '../actionTypes/member.js';

export const initialState = {
  member: { member_id: 1 },
  session_id: '',
  signUpSession: '',
  locationInfo: {},
  isFetching: false,
  error: null,
  members: [],
  loadingMembers: false,
};

const member = (state = initialState, action) => {
  switch (action.type) {
    case GET_MEMBER_DATA_SUCCEEDED:
      return {
        ...state,
        member: action.payload,
        session_id: action.payload.session_id,
      };
    case GET_MEMBER_DATA_FAILED:
      return {
        ...state,
        member: {},
        session_id: '',
      };
    case SAVE_SIGN_UP_SESSION:
      return {
        ...state,
        signUpSession: action.payload,
      };
    case CLEAR_SIGN_UP_SESSION:
      return {
        ...state,
        signUpSession: '',
      };
    case MEMBER_LOGIN_SUCCEEDED:
      return {
        ...state,
        session_id: action.payload.session_id,
      };
    case MEMBER_LOGOUT_SUCCEEDED:
      return {
        ...state,
        member: {},
        session_id: '',
      };
    case GET_MEMBER_LOCATION_INFO_START:
      return {
        ...state,
        locationInfo: action.payload,
        isFetching: true,
      };
    case GET_MEMBER_LOCATION_INFO_SUCCEEDED:
      return {
        ...state,
        locationInfo: action.payload,
        isFetching: false,
      };
    case GET_MEMBER_LOCATION_INFO_FAILED:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };
    case MEMBERS_LOADING:
      return {
        ...state,
        loadingMembers: true,
      };
    case MEMBERS_LOAD_SUCCESS:
      return {
        ...state,
        loadingMembers: false,
        members: action.payload,
      };
    default:
      return state;
  }
};

export default member;
