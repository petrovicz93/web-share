import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Alert } from 'react-bootstrap';

import AddMemberForm from './AddMemberForm';
import InviteMemberForm from './InviteMemberForm';
import { removeGroupAlert } from '../../redux/actions/group';

const FormCard = (props) => {
  const { dispatch, groupAlert, memberForm } = props;

  useEffect(() => {
    if (groupAlert.show) {
      setTimeout(() => {
        dispatch(removeGroupAlert());
      }, 2500);
    }
  }, [groupAlert, dispatch]);

  return (
    <Card className="mt-5">
      <Card.Header>Add Member</Card.Header>
      <Card.Body>
        <Alert show={groupAlert.show} variant={groupAlert.variant}>
          {groupAlert.message}
        </Alert>
        {memberForm ? (
          <AddMemberForm></AddMemberForm>
        ) : (
          <InviteMemberForm></InviteMemberForm>
        )}
      </Card.Body>
    </Card>
  );
};

FormCard.propTypes = {
  dispatch: PropTypes.func,
  groupAlert: PropTypes.object,
  memberForm: PropTypes.bool,
};

FormCard.defaultProps = {
  dispatch: null,
  groupAlert: {},
  memberForm: true,
};

const mapStateToProps = (state) => ({
  groupAlert: state.group.groupAlert,
  memberForm: state.group.memberForm,
});

export default connect(mapStateToProps)(FormCard);
