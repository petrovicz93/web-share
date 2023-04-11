import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import GroupDetailModal from './GroupDetailModal';
import SaveData from '../../components/Modal/SaveData';

import {
  getGroupDetail,
  setShowGroupDetailModal,
} from '../../redux/actions/group';
import { NumberDateFormat } from '../../utils/dateFormat';
import EmptyGroup from '../../assets/img/empty-group.png';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const ListContainer = (props) => {
  const {
    dispatch,
    groupList,
    ameraGroupSecurity,
    showGroupDetailModal,
  } = props;
  const [showSaveDataModal, setShowSaveDataModal] = useState(false);

  const { SearchBar } = Search;

  const filterAmeraGroupSecurity = useCallback(
    (groupId) => {
      for (var i = 0; i < ameraGroupSecurity.length; i++) {
        if (ameraGroupSecurity[i].groupId === groupId) {
          return true;
        }
      }
      return false;
    },
    [ameraGroupSecurity]
  );

  const groupAvatarFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div className="group-image">
        <img src={EmptyGroup} alt={EmptyGroup} />
      </div>
    );
  };

  const dateFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <span className="group-create-date">
        {NumberDateFormat(row.create_date)}
      </span>
    );
  };

  const columns = [
    {
      dataField: 'group_id',
      text: '',
      sort: false,
      headerStyle: (colum, colIndex) => {
        return { textAlign: 'center', cursor: 'pointer' };
      },
      style: {
        verticalAlign: 'middle',
        textAlign: 'center',
        cursor: 'pointer',
      },
      formatter: groupAvatarFormatter,
    },
    {
      dataField: 'group_name',
      text: 'Group Name',
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: 'center', cursor: 'pointer' };
      },
      style: {
        verticalAlign: 'middle',
        textAlign: 'center',
        cursor: 'pointer',
      },
    },
    {
      dataField: 'total_member',
      text: 'Total Member',
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: 'center', cursor: 'pointer' };
      },
      style: {
        verticalAlign: 'middle',
        textAlign: 'center',
        cursor: 'pointer',
      },
    },
    {
      dataField: 'create_date',
      text: 'Created Date',
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { textAlign: 'center', cursor: 'pointer' };
      },
      style: {
        verticalAlign: 'middle',
        textAlign: 'center',
        cursor: 'pointer',
      },
      formatter: dateFormatter,
    },
  ];

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      dispatch(getGroupDetail(row.group_id));
      const isGroupSecurity = filterAmeraGroupSecurity(row.group_id);
      if (!isGroupSecurity) {
        setShowSaveDataModal(true);
      } else {
        dispatch(setShowGroupDetailModal(true));
      }
    },
  };

  const defaultSorted = [
    {
      dataField: 'create_date',
      order: 'desc',
    },
  ];

  return (
    <div className="list-view-section">
      <Container>
        <ToolkitProvider
          bootstrap4
          keyField="group_id"
          data={groupList}
          columns={columns}
          defaultSorted={defaultSorted}
          search
        >
          {(props) => (
            <div>
              <SearchBar {...props.searchProps} />
              <BootstrapTable
                {...props.baseProps}
                pagination={paginationFactory()}
                rowEvents={rowEvents}
              />
            </div>
          )}
        </ToolkitProvider>
      </Container>
      <SaveData
        show={showSaveDataModal}
        close={() => setShowSaveDataModal(false)}
      ></SaveData>
      <GroupDetailModal
        show={showGroupDetailModal}
        close={() => dispatch(setShowGroupDetailModal(false))}
      ></GroupDetailModal>
    </div>
  );
};

ListContainer.propTypes = {
  dispatch: PropTypes.func,
  groupList: PropTypes.arrayOf(PropTypes.object),
  ameraGroupSecurity: PropTypes.arrayOf(PropTypes.object),
  groupData: PropTypes.object,
  showGroupDetailModal: PropTypes.bool,
};

ListContainer.defaultProps = {
  dispatch: null,
  groupList: [],
  ameraGroupSecurity: [],
  groupData: {},
  showGroupDetailModal: false,
};

const mapStateToProps = (state) => ({
  groupList: state.group.groupList,
  ameraGroupSecurity: state.group.ameraGroupSecurity,
  groupData: state.group.groupData,
  showGroupDetailModal: state.group.showGroupDetailModal,
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({}, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
