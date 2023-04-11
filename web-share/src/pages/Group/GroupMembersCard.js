import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { MdClose } from 'react-icons/md';

import { removeGroupMember } from '../../redux/actions/group';

const GroupMembersCard = (props) => {
  const { dispatch, groupData } = props;

  const removeMemberFromGroup = (groupMemberId, groupId) => {
    let formData = new FormData();
    formData.set('groupMemberId', groupMemberId);
    formData.set('groupId', groupId);
    dispatch(removeGroupMember(formData));
  };

  return (
    <Card className="mt-5">
      <Card.Header>Members</Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          {groupData.members
            ? groupData.members.map((member, index) => (
                <ListGroup.Item key={index}>
                  {member.first_name} {member.last_name}
                  <Button
                    type="button"
                    size="sm"
                    variant="danger"
                    className="remove-member-btn"
                    onClick={() =>
                      removeMemberFromGroup(
                        member.member_id,
                        groupData.group_id
                      )
                    }
                  >
                    <MdClose></MdClose>
                  </Button>
                </ListGroup.Item>
              ))
            : null}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

GroupMembersCard.propTypes = {
  groupData: PropTypes.object,
  dispatch: PropTypes.func,
};

GroupMembersCard.defaultProps = {
  groupList: {},
  dispatch: null,
};

const mapStateToProps = (state) => ({
  groupData: state.group.groupData,
});

export default connect(mapStateToProps)(GroupMembersCard);
