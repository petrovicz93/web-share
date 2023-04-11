import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Col, Row } from 'react-bootstrap';
import Pagination from '@material-ui/lab/Pagination';

import GroupDetailModal from './GroupDetailModal';
import SaveData from '../../components/Modal/SaveData';

import {
  getGroupDetail,
  setShowGroupDetailModal,
} from '../../redux/actions/group';
import dateFormat from '../../utils/dateFormat';
import EmptyGroup from '../../assets/img/empty-group.png';

const CardContainer = (props) => {
  const {
    dispatch,
    groupList,
    ameraGroupSecurity,
    showGroupDetailModal,
  } = props;

  const itemsPerPage = 12;
  const [page, setPage] = useState(1);
  const [noOfPages] = React.useState(
    Math.ceil(groupList.length / itemsPerPage)
  );

  const handleChange = (event, value) => {
    setPage(value);
  };

  const [showSaveDataModal, setShowSaveDataModal] = useState(false);

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

  const showGroupDetail = (group) => {
    dispatch(getGroupDetail(group.group_id));
    const isGroupSecurity = filterAmeraGroupSecurity(group.group_id);
    if (!isGroupSecurity) {
      setShowSaveDataModal(true);
    } else {
      dispatch(setShowGroupDetailModal(true));
    }
  };

  return (
    <>
      <Row className="show-grid">
        <Col lg={12} xl={12} className="card-list-view">
          <Row className="show-grid">
            {groupList
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((group, index) => {
                return (
                  <Col
                    xl={4}
                    lg={6}
                    md={12}
                    sm={12}
                    className="group-card"
                    key={group.group_id}
                  >
                    <Card onClick={() => showGroupDetail(group)}>
                      <div className="group-image">
                        <img src={EmptyGroup} alt={EmptyGroup} />
                      </div>
                      <Card.Body>
                        <Card.Title>{group.group_name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          Created in {dateFormat(group.create_date)}
                        </Card.Subtitle>
                        <Card.Text>
                          Total Members: {group.total_member}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </Col>
        <div className="card-pagination">
          {groupList.length > 0 ? (
            <Pagination
              variant="outlined"
              shape="rounded"
              count={noOfPages}
              page={page}
              onChange={handleChange}
              defaultPage={1}
              color="primary"
              showFirstButton
              showLastButton
            />
          ) : null}
        </div>
      </Row>
      <SaveData
        show={showSaveDataModal}
        close={() => setShowSaveDataModal(false)}
      ></SaveData>
      <GroupDetailModal
        show={showGroupDetailModal}
        close={() => dispatch(setShowGroupDetailModal(false))}
      ></GroupDetailModal>
    </>
  );
};

CardContainer.propTypes = {
  dispatch: PropTypes.func,
  groupList: PropTypes.arrayOf(PropTypes.object),
  ameraGroupSecurity: PropTypes.arrayOf(PropTypes.object),
  groupData: PropTypes.object,
  showGroupDetailModal: PropTypes.bool,
};

CardContainer.defaultProps = {
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

export default connect(mapStateToProps)(CardContainer);
