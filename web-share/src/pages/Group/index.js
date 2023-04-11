import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from '../Sections/Layout';

import MyGroup from './MyGroup';
import GroupMembership from './GroupMembership';

const Group = (props) => {
  return (
    <Layout {...props}>
      <Switch>
        <Redirect
          from={`${process.env.PUBLIC_URL}/group`}
          to={`${process.env.PUBLIC_URL}/group/my-groups`}
          exact
        />
        <Route
          path={`${process.env.PUBLIC_URL}/group/my-groups`}
          component={MyGroup}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/group/membership`}
          component={GroupMembership}
        />
      </Switch>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);
