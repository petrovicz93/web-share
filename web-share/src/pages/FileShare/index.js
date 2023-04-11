import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from '../Sections/Layout';
import MemberFiles from './MemberFiles';
import SharedFiles from './SharedFiles';

const FileShare = (props) => {
  return (
    <Layout {...props}>
      <Switch>
        <Redirect
          from={`${process.env.PUBLIC_URL}/fileshare`}
          to={`${process.env.PUBLIC_URL}/fileshare/my-files`}
          exact
        />
        <Route
          path={`${process.env.PUBLIC_URL}/fileshare/my-files`}
          component={MemberFiles}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/fileshare/shared-files`}
          component={SharedFiles}
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

export default connect(mapStateToProps, mapDispatchToProps)(FileShare);
