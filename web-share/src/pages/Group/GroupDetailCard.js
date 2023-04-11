import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, ListGroup } from 'react-bootstrap';

import dateFormat from '../../utils/dateFormat';

const GroupDetailCard = (props) => {
  const { groupData } = props;
  return (
    <Card>
      <Card.Header>Detail</Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>Group Name: {groupData.group_name}</ListGroup.Item>
          <ListGroup.Item>
            Create Date: {dateFormat(groupData.create_date)}
          </ListGroup.Item>
          <ListGroup.Item>
            Total Members: {groupData.total_member}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

GroupDetailCard.propTypes = {
  groupData: PropTypes.object,
};

GroupDetailCard.defaultProps = {
  groupData: {},
};

const mapStateToProps = (state) => ({
  groupData: state.group.groupData,
});

export default connect(mapStateToProps)(GroupDetailCard);
