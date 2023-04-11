import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Accordion,
  Card,
  ListGroup,
  Modal,
  Button,
  Form,
} from 'react-bootstrap';

import { getGroupMemberShip } from '../../redux/actions/group';
import dateFormat from '../../utils/dateFormat';

const GroupMembership = (props) => {
  const { member, dispatch } = props;
  const [groupList, setGroupList] = useState([]);
  const [groupDetail, setGroupDetail] = useState([]);

  const [showGroupDetailModal, setShowGroupDetailModal] = useState(false);

  useEffect(() => {
    getGroupMemberShip(member.member_id)
      .then((res) => {
        setGroupList(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch, member]);

  const showDetail = (group) => {
    setGroupDetail(group);
    setShowGroupDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowGroupDetailModal(false);
  };

  const sortBy = (e) => {
    e.preventDefault();
    const key = e.target.value;
    const groupMembers = sortMember(groupDetail.members, key);
    setGroupDetail({
      ...groupDetail,
      members: groupMembers,
    });
  };

  const sortMember = (members, sortKey) => {
    let newMembers = [];
    if (sortKey === 'Name') {
      newMembers = members.sort(function (a, b) {
        if (a.first_name < b.first_name) {
          return -1;
        }
        if (a.first_name > b.first_name) {
          return 1;
        }
        return 0;
      });
    } else if (sortKey === 'Joined Date') {
      newMembers = members.sort(function (a, b) {
        if (new Date(a.joined_date) < new Date(b.joined_date)) {
          return -1;
        }
        if (new Date(a.joined_date) > new Date(b.joined_date)) {
          return 1;
        }
        return 0;
      });
    }
    return newMembers;
  };

  return (
    <div className="group-section">
      <Accordion defaultActiveKey="" className="group-list">
        {groupList.map((group, index) => (
          <Card key={index} className="group-card">
            <Accordion.Toggle as={Card.Header} eventKey={index}>
              {group.group_name}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={index}>
              <Card.Body onClick={() => showDetail(group)}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    Group Name: {group.group_name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Created by {group.group_leader_first_name}{' '}
                    {group.group_leader_last_name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Created in {dateFormat(group.group_created_date)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Joined in {dateFormat(group.group_membership_create_date)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Total Members: {group.total_member}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>

      <Modal
        size="md"
        show={showGroupDetailModal}
        onHide={() => closeDetailModal()}
        aria-labelledby="group-detail-modal-title"
        className="group-detail-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="group-detail-modal-title">
            {groupDetail.group_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Header>Detail</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Group Name: {groupDetail.group_name}
                </ListGroup.Item>
                <ListGroup.Item>
                  Created by {groupDetail.group_leader_first_name}{' '}
                  {groupDetail.group_leader_last_name}
                </ListGroup.Item>
                <ListGroup.Item>
                  Created in {dateFormat(groupDetail.group_created_date)}
                </ListGroup.Item>
                <ListGroup.Item>
                  Joined in{' '}
                  {dateFormat(groupDetail.group_membership_create_date)}
                </ListGroup.Item>
                <ListGroup.Item>
                  Total Members: {groupDetail.total_member}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card className="mt-5">
            <Form.Group className="sort-group-members">
              <Form.Label className="sort-label mr-2">Sort By</Form.Label>
              <Form.Control as="select" onChange={(event) => sortBy(event)}>
                <option>Joined Date</option>
                <option>Name</option>
              </Form.Control>
            </Form.Group>
            <Card.Header>Members</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {groupDetail.members
                  ? groupDetail.members.map((member, index) => (
                      <ListGroup.Item key={index}>
                        {member.first_name} {member.last_name}
                      </ListGroup.Item>
                    ))
                  : null}
              </ListGroup>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => closeDetailModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

GroupMembership.propTypes = {
  member: PropTypes.object,
  dispatch: PropTypes.func,
};

GroupMembership.defaultProps = {
  groupList: {},
  dispatch: null,
};

const mapStateToProps = (state) => ({
  member: state.member.member,
});

export default connect(mapStateToProps)(GroupMembership);
