import {
  CREATE_GROUP,
  IS_LOADING_CREATE_GROUP,
  GET_GROUP_LIST,
  IS_LOADING_GET_GROUP_LIST,
  SET_AMERA_GROUP_SECURITY,
  GET_GROUP_DETAIL,
  REMOVE_GROUP_MEMBER,
  ADD_GROUP_MEMBER,
  SET_GROUP_ALERT,
  REMOVE_GROUP_ALERT,
  SET_ADD_MEMBER_FROM,
  SET_SHOW_GROUP_DETAIL_MODAL,
  GET_GROUP_MEMBERSHIP,
} from '../actionTypes/group';

// The initial state of the App
export const initialState = {
  createGroupLoading: false,
  getGroupListLoading: false,
  groupList: [],
  groupData: {},
  ameraGroupSecurity: [],
  groupAlert: {
    show: false,
    variant: '',
    message: '',
  },
  memberForm: true,
  showGroupDetailModal: false,
  groupMembershipList: [],
};

const group = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING_CREATE_GROUP:
      return {
        ...state,
        createGroupLoading: true,
      };
    case IS_LOADING_GET_GROUP_LIST:
      return {
        ...state,
        getGroupListLoading: true,
      };
    case CREATE_GROUP:
      return {
        ...state,
        createGroupLoading: false,
        groupList: action.payload.concat(state.groupList),
      };
    case GET_GROUP_LIST:
      return {
        ...state,
        getGroupListLoading: false,
        groupList: [...action.payload],
      };
    case SET_AMERA_GROUP_SECURITY:
      return {
        ...state,
        ameraGroupSecurity: [...state.ameraGroupSecurity, action.payload],
      };
    case GET_GROUP_DETAIL:
      return {
        ...state,
        groupData: action.payload,
      };
    case REMOVE_GROUP_MEMBER:
      return {
        ...state,
        groupData: action.payload,
        groupList: reTotalGroupMemberCount(
          state.groupList,
          action.payload,
          'remove'
        ),
      };
    case ADD_GROUP_MEMBER:
      return {
        ...state,
        groupData: action.payload,
        groupList: reTotalGroupMemberCount(
          state.groupList,
          action.payload,
          'add'
        ),
      };
    case SET_GROUP_ALERT:
      return {
        ...state,
        groupAlert: {
          show: true,
          variant: action.payload.variant,
          message: action.payload.message,
        },
      };
    case REMOVE_GROUP_ALERT:
      return {
        ...state,
        groupAlert: {
          show: false,
          variant: '',
          message: '',
        },
      };
    case SET_ADD_MEMBER_FROM:
      return {
        ...state,
        memberForm: action.payload,
      };
    case SET_SHOW_GROUP_DETAIL_MODAL:
      return {
        ...state,
        showGroupDetailModal: action.payload,
      };
    case GET_GROUP_MEMBERSHIP:
      return {
        ...state,
        groupMembershipList: action.payload,
      };
    default:
      return state;
  }
};

function reTotalGroupMemberCount(groupList, group, type) {
  for (let i = 0; i < groupList.length; i++) {
    if (groupList[i]['group_id'] === group.group_id)
      if (type === 'remove') {
        groupList[i].total_member--;
      } else if (type === 'add') {
        groupList[i].total_member++;
      }
  }
  return groupList;
}

export default group;
