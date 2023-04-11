import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Menu from './Menu';

const Payments = (props) => {
  return (
    <div className="profile_page-body">
      <Menu />
      <div className="profile_page-payments">Payment Settings</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
