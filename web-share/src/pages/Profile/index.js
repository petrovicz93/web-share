import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from '../Sections/Layout';
import Settings from './Settings';
import Notifications from './Notifications';
import Payments from './Payments';
import SecurityInformation from './SecurityInformation';

const Profile = (props) => {
  return (
    <Layout {...props}>
      <div className="profile_page">
        <Switch>
          <Redirect
            from={`${process.env.PUBLIC_URL}/profile`}
            to={`${process.env.PUBLIC_URL}/profile/settings`}
            exact
          />
          <Route
            path={`${process.env.PUBLIC_URL}/profile/settings`}
            component={Settings}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/profile/notifications`}
            component={Notifications}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/profile/payments`}
            component={Payments}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/profile/security`}
            component={SecurityInformation}
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
