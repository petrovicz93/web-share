import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';

import Layout from '../Sections/Layout';
import CalendarWidget from './Calendar';
import Event from './Event';
import ScheduledMeetings from './ScheduledMeetings/index';
import Notifications from './Notification';

const Dashboard = (props) => {

  return (
    <Layout {...props}>
      <Row className="dashboard-section">
        <Col md={8}>
          <Row>
            <Col md={5}>
              <CalendarWidget></CalendarWidget>
            </Col>
            <Col md={7}>
              <Event></Event>
            </Col>
          </Row>
          <Row className="scheduled-meetings mt-5">
            <Col md={12}>
              <ScheduledMeetings />
            </Col>
          </Row>
        </Col>
        <Col md={4} className="notification-widget">
          <Notifications></Notifications>
        </Col>
      </Row>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
