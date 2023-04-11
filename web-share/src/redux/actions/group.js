import * as api from '../../config/api';
import {
  IS_LOADING_CREATE_GROUP,
  IS_LOADING_GET_GROUP_LIST,
  CREATE_GROUP,
  GET_GROUP_LIST,
  GET_GROUP_DETAIL,
  REMOVE_GROUP_MEMBER,
  ADD_GROUP_MEMBER,
  SET_GROUP_ALERT,
  REMOVE_GROUP_ALERT,
  SET_ADD_MEMBER_FROM,
  SET_AMERA_GROUP_SECURITY,
  SET_SHOW_GROUP_DETAIL_MODAL,
  // GET_GROUP_MEMBERSHIP,
} from '../actionTypes/group';

import setAlert from '../../utils/alert';

const apiUrl = api.apiUrl;

// create new group
export const createGroup = (formData) => {
  const url = `${apiUrl}/group`;
  return function (dispatch) {
    dispatch({
      type: IS_LOADING_CREATE_GROUP,
    });
    api
      .POST(url, formData, {})
      .then((res) => {
        dispatch({
          type: CREATE_GROUP,
          payload: res.data,
        });
        dispatch({
          type: SET_GROUP_ALERT,
          payload: setAlert(res, true, 'Group'),
        });
      })
      .catch((error) => {
        dispatch({
          type: CREATE_GROUP,
          payload: [],
        });
        dispatch({
          type: SET_GROUP_ALERT,
          payload: setAlert(error, false, 'Group'),
        });
      });
  };
};

// get group list for logged in member
export const getGroupList = (groupLeaderId) => {
  const url = `${apiUrl}/groups?groupLeaderId=${groupLeaderId}`;
  return function (dispatch) {
    dispatch({
      type: IS_LOADING_GET_GROUP_LIST,
    });
    api
      .GET(url)
      .then((res) => {
        dispatch({
          type: GET_GROUP_LIST,
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_GROUP_LIST,
          payload: [],
        });
      });
  };
};

// get group detail information
export const getGroupDetail = (groupId) => {
  const url = `${apiUrl}/group/${groupId}`;
  return function (dispatch) {
    api
      .GET(url)
      .then((res) => {
        dispatch({
          type: GET_GROUP_DETAIL,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

// add member to group
export const addGroupMember = (formData) => {
  const url = `${apiUrl}/groups/membership`;
  return function (dispatch) {
    api
      .POST(url, formData, {})
      .then((res) => {
        dispatch({
          type: ADD_GROUP_MEMBER,
          payload: res.data,
        });
        dispatch({
          type: SET_GROUP_ALERT,
          payload: setAlert(res, true, 'Member'),
        });
      })
      .catch((error) => {
        dispatch({
          type: SET_GROUP_ALERT,
          payload: setAlert(error, false, 'Member'),
        });
      });
  };
};

// remove member from group
export const removeGroupMember = (formData) => {
  const url = `${apiUrl}/groups/membership`;
  return function (dispatch) {
    api
      .DELETE(url, formData, {})
      .then((res) => {
        dispatch({
          type: REMOVE_GROUP_MEMBER,
          payload: res.data,
        });
        dispatch({
          type: SET_GROUP_ALERT,
          payload: setAlert(res, true, 'Member'),
        });
      })
      .catch((error) => {
        dispatch({
          type: SET_GROUP_ALERT,
          payload: setAlert(error, true, 'Member'),
        });
      });
  };
};

// add member to group
export const sendGroupMemberInvite = (formData) => {
  const url = `${apiUrl}/member/group/invite`;
  return function (dispatch) {
    api
      .POST(url, formData, {})
      .then((res) => {
        dispatch({
          type: REMOVE_GROUP_MEMBER,
          payload: res.data,
        });
        dispatch({
          type: SET_GROUP_ALERT,
          payload: setAlert(res, true, 'Invite'),
        });
      })
      .catch((error) => {
        dispatch({
          type: SET_GROUP_ALERT,
          payload: setAlert(error, false, 'Invite'),
        });
      });
  };
};

export const removeGroupAlert = () => {
  return function (dispatch) {
    dispatch({
      type: REMOVE_GROUP_ALERT,
      payload: null,
    });
  };
};

export const switchAddMemberForm = () => {
  return function (dispatch) {
    dispatch({
      type: SET_ADD_MEMBER_FROM,
      payload: true,
    });
  };
};

export const setInitAlert = () => {
  return function (dispatch) {
    dispatch({
      type: SET_GROUP_ALERT,
      payload: {
        show: false,
        variant: '',
        message: '',
      },
    });
  };
};

export const setAmeraGroupSecurity = (payload) => {
  return function (dispatch) {
    dispatch({
      type: SET_AMERA_GROUP_SECURITY,
      payload,
    });
  };
};

export const setShowGroupDetailModal = (payload) => {
  return function (dispatch) {
    dispatch({
      type: SET_SHOW_GROUP_DETAIL_MODAL,
      payload,
    });
  };
};

// get group membership with redux
// export const getGroupMemberShip = (memberId) => {
//   const url = `${apiUrl}/groups/membership?member_id=${memberId}`;
//   return function (dispatch) {
//     api
//       .GET(url, {})
//       .then((res) => {
//         dispatch({
//           type: GET_GROUP_MEMBERSHIP,
//           payload: res.data,
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };
// };

// get group membership list
export const getGroupMemberShip = (memberId) => {
  const url = `${apiUrl}/groups/membership?member_id=${memberId}`;
  return api.GET(url, {});
};
