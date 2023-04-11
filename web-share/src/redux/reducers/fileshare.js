import {
  IS_LOADING_FILESHARE_DATA,
  IS_LOADING_CREATE_FILESHARE,
  FILESHARE_DATA,
  ADD_FILESHARE_DATA,
  SHAREDFILE_DATA,
  FEIL_DETAIL_DATA,
  SHARED_FILE_DETAIL_DATA,
} from '../actionTypes/fileshare.js';

// The initial state of the App
export const initialState = {
  loading: false,
  createLoading: false,
  error: false,
  fileList: [],
  sharedFileData: [],
  fileDetailData: {},
  sharedFileDetailData: {},
};

const fileshare = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING_FILESHARE_DATA:
      return {
        ...state,
        loading: true,
      };
    case IS_LOADING_CREATE_FILESHARE:
      return {
        ...state,
        createLoading: true,
      };
    case FILESHARE_DATA:
      return {
        ...state,
        loading: false,
        fileList: [...action.payload],
      };
    case ADD_FILESHARE_DATA:
      return {
        ...state,
        createLoading: false,
        fileList: action.payload.concat(state.fileList),
      };
    case SHAREDFILE_DATA:
      return {
        ...state,
        loading: false,
        sharedFileData: [...action.payload],
      };
    case FEIL_DETAIL_DATA:
      return {
        ...state,
        fileDetailData: action.payload,
      };
    case SHARED_FILE_DETAIL_DATA:
      return {
        ...state,
        sharedFileDetailData: action.payload,
      };
    default:
      return state;
  }
};

export default fileshare;
