import * as api from '../../config/api';
import {
  IS_LOADING_FILESHARE_DATA,
  IS_LOADING_CREATE_FILESHARE,
  FILESHARE_DATA,
  ADD_FILESHARE_DATA,
  SHAREDFILE_DATA,
  FEIL_DETAIL_DATA,
  SHARED_FILE_DETAIL_DATA
} from '../actionTypes/fileshare.js';

const apiUrl = api.apiUrl;

// Member File API
export const getMemberFiles = (memberId) => {
  return function (dispatch) {
    dispatch({
      type: IS_LOADING_FILESHARE_DATA,
    });
    const url = `${apiUrl}/cloud/files?memberId=${memberId}`;
    api
      .GET(url)
      .then((res) => {
        dispatch({
          type: FILESHARE_DATA,
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: ADD_FILESHARE_DATA,
          payload: [],
        });
      });
  };
};

export const createNewFile = (formData) => {
  return function (dispatch) {
    dispatch({
      type: IS_LOADING_CREATE_FILESHARE,
    });
    const url = `${apiUrl}/cloud/files`;
    api
      .POST(url, formData, {})
      .then((res) => {
        dispatch({
          type: ADD_FILESHARE_DATA,
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: ADD_FILESHARE_DATA,
          payload: [],
        });
      });
  };
};

export const getFileDetails = (memberId, fileId) => {
  const url = `${apiUrl}/cloud/files/details/${fileId}?memberId=${memberId}`;
  return function (dispatch) {
    api
      .GET(url)
      .then((res) => {
        dispatch({
          type: FEIL_DETAIL_DATA,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.error(error)
      });
  };
};

export const shareFile = (fileId, memberId, sharingMemberEmail) => {
  const url = `${apiUrl}/cloud/files/share`;
  const data = JSON.stringify({
    fileId: fileId,
    memberId: memberId,
    sharingMemberEmail: sharingMemberEmail,
  });
  const options = {
    'Content-Type': 'application/json',
  };

  // return api.POST(url, data, options);
  return function (dispatch) {
    api
      .POST(url, data, options)
      .then((res) => {
        // dispatch({
        //   type: FEIL_DETAIL_DATA,
        //   payload: res.data,
        // });
        console.log(res);
      })
      .catch((error) => {
        console.error(error)
      });
  };
};

export const deleteFile = (fileId) => {
  const url = `${apiUrl}/cloud/files`;
  const data = JSON.stringify({
    fileId: fileId,
  });
  const options = {
    'Content-Type': 'application/json',
  };

  return api.DELETE(url, data, options);
};

export const getDownloadFile = (fileId) => {
  const url = `${apiUrl}/cloud/files/download/${fileId}`;
  return api.GET(url);
};
// End Member File API

// Shared File API
export const getSharedFiles = (memberId) => {
  return function (dispatch) {
    dispatch({
      type: IS_LOADING_FILESHARE_DATA,
    });
    const url = `${apiUrl}/cloud/files/share?memberId=${memberId}`;
    api
      .GET(url)
      .then((res) => {
        dispatch({
          type: SHAREDFILE_DATA,
          payload: res.data,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const getSharedFileDetail = (memberId, sharedKey) => {
  const url = `${apiUrl}/cloud/files/share/details/${sharedKey}?memberId=${memberId}`;
  return api.GET(url);
};

export const removeShare = (sharedKey) => {
  const url = `${apiUrl}/cloud/files/share`;
  const data = JSON.stringify({
    sharedKey: sharedKey,
  });
  const options = {
    'Content-Type': 'application/json',
  };
  return api.DELETE(url, data, options);
};

export const getDownloadSharedFile = (sharedKey) => {
  const url = `${apiUrl}/cloud/files/share/download/${sharedKey}`;
  return api.GET(url);
};

// End Shared File API
