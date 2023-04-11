import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Switch, Route } from 'react-router-dom';

import history from './utils/history';
import './styles/index.scss';

import { appStart } from './redux/actions/app';

import MainRouter from './MainRouter';

class App extends Component {
  render() {
    return (
      <Router basename={`${process.env.PUBLIC_URL}/history`} history={history}>
        <Switch>
          <Route path="/" component={MainRouter} />
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ appStart }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
