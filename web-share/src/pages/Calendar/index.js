import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from '../Sections/Layout';

import UpcomingEvents from './UpcomingEvents';
import GroupEvents from './GroupEvents';
import PreviousEvents from './PreviousEvents';

const Calendar = (props) => {
  return (
    <Layout {...props}>
      <div className="calendar_page">
        <Switch>
          <Redirect
            from={`${process.env.PUBLIC_URL}/calendar`}
            to={`${process.env.PUBLIC_URL}/calendar/upcoming-events`}
            exact
          />
          <Route
            path={`${process.env.PUBLIC_URL}/calendar/upcoming-events`}
            component={UpcomingEvents}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/calendar/group-events`}
            component={GroupEvents}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/calendar/prev-events`}
            component={PreviousEvents}
          />
        </Switch>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
