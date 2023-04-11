import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Pages
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FileShare from './pages/FileShare';
import Profile from './pages/Profile';
import Group from './pages/Group';
import Contact from './pages/Contact';

import { getMember } from './redux/actions/member';
import Layout from './pages/Sections/Layout';
import Calendar from './pages/Calendar';

const MainRouter = (props) => {
  const dispatch = props.dispatch;

  useEffect(() => {
    dispatch(getMember());
  }, [dispatch]);

  return (
    <Switch>
      <Route exact path={`${process.env.PUBLIC_URL}/login`} component={Login} />
      <Route exact path={`${process.env.PUBLIC_URL}/signup`} component={SignUp} />

      <Redirect
        from={`${process.env.PUBLIC_URL}/`}
        to={`${process.env.PUBLIC_URL}/dashboard`}
        exact
      />
      <Route
        path={`${process.env.PUBLIC_URL}/dashboard`}
        component={Dashboard}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/fileshare`}
        component={FileShare}
      />
      <Route path={`${process.env.PUBLIC_URL}/contacts`} component={Contact} />
      <Route path={`${process.env.PUBLIC_URL}/profile`} component={Profile} />
      <Route path={`${process.env.PUBLIC_URL}/group`} component={Group} />
      <Route path={`${process.env.PUBLIC_URL}/calendar`} component={Calendar} />
      <Route path="/" component={Layout} />
    </Switch>
  );
};

const mapStateToProps = (state) => ({
  member: state.member.member,
});

export default connect(mapStateToProps)(MainRouter);
