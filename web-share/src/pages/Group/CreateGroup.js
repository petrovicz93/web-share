import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { createGroup, removeGroupAlert } from '../../redux/actions/group';

const CreateNewGroup = (props) => {
  const { show, close, member, groupAlert } = props;
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (groupAlert.show) {
      setTimeout(() => {
        props.removeGroupAlert();
      }, 2500);
    }
  }, [props, groupAlert]);

  const handleSetGroupName = (name) => {
    setError(false);
    setGroupName(name);
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!groupName) {
      setError(true);
      return false;
    }
    var formData = new FormData();
    formData.set('groupName', groupName);
    formData.set('groupLeaderId', member.member_id);
    props.createGroup(formData);
  };

  return (
    <>
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Group</Modal.Title>
        </Modal.Header>
        <Form className="create-new-group-form">
          <Modal.Body>
            <Alert show={groupAlert.show} variant={groupAlert.variant}>
              {groupAlert.message}
            </Alert>
            <Form.Group controlId="formBasicGroupName">
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Group Name"
                onChange={(e) => handleSetGroupName(e.target.value)}
              />
              {error ? <p className="error">This field is required</p> : null}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={close}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => handleCreateGroup(e)}
            >
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

CreateNewGroup.propTypes = {
  dispatch: PropTypes.func,
  show: PropTypes.bool,
  close: PropTypes.func,
  member: PropTypes.object,
  groupAlert: PropTypes.object,
};

CreateNewGroup.defaultProps = {
  dispatch: null,
  show: false,
  close: null,
  member: {},
  groupAlert: {},
};

const mapStateToProps = (state) => ({
  member: state.member.member,
  groupAlert: state.group.groupAlert,
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({ createGroup, removeGroupAlert }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewGroup);
