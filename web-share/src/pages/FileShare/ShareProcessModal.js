import React, { useState } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';

import { shareFile } from '../../redux/actions/fileshare';

import { isEmail } from '../../utils/validator';

const ShareProcessModal = (props) => {
  const { dispatch, member, show, close, fileId} = props;
  const memberId = member.member_idl
  const [email, setEmail] = useState('');
  const [error, setError] = useState('')

  const shareFileSubmit = (e) => {
    e.preventDefault();
    if (email) {
      if (isEmail(email)) {
        dispatch(shareFile(fileId, memberId, email))
      } else {
        setError('Email is Invalid');
        return false;
      }
    } else {
      setError('This field is required');
      return false;
    }
  };

  const setMemberEmail = (e) => {
    e.preventDefault();
    setError('');
    setEmail(e.target.value);
  }

  return (
    <>
      <Modal
        show={show}
        onHide={close}
        className="share-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>File Sharing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              Please enter the email of the member you want to share:
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setMemberEmail(e)}
            />
            {error && <p className="error">{error}</p>}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={(e) => shareFileSubmit(e)}>
            Share
          </Button>
          <Button variant="danger" onClick={close}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ShareProcessModal.propTypes = {
  dispatch: PropTypes.func,
  show: PropTypes.bool,
  close: PropTypes.func,
  member: PropTypes.object,
  fileId: PropTypes.number,
}

ShareProcessModal.defaultProps = {
  dispatch: null,
  show: false,
  close: null,
  member: {},
  fileId: 0,
}

const mapStateToProps = (state) => ({
  member: state.member.member,
});

export default connect(mapStateToProps)(ShareProcessModal);
