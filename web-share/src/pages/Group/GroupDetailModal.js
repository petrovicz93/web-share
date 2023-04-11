import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

import GroupDetailCard from './GroupDetailCard';
import GroupMembersCard from './GroupMembersCard';
import FormCard from './FormCard';

import { switchAddMemberForm, setInitAlert } from '../../redux/actions/group';

const GroupDetailModal = (props) => {
  const { dispatch, show, close, groupData } = props;

  const modalHide = () => {
    dispatch(setInitAlert());
    dispatch(switchAddMemberForm());
    close();
  };

  return (
    <>
      <Modal
        size="md"
        show={show}
        onHide={() => modalHide()}
        aria-labelledby="group-detail-modal-title"
        className="group-detail-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="group-detail-modal-title">
            {groupData.group_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GroupDetailCard></GroupDetailCard>
          <GroupMembersCard></GroupMembersCard>
          <FormCard></FormCard>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={modalHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

GroupDetailModal.propTypes = {
  dispatch: PropTypes.func,
  groupData: PropTypes.object,
  show: PropTypes.bool,
  close: PropTypes.func,
};

GroupDetailModal.defaultProps = {
  dispatch: null,
  groupData: {},
  show: false,
  close: null,
};

const mapStateToProps = (state) => ({
  groupData: state.group.groupData,
});

export default connect(mapStateToProps)(GroupDetailModal);
