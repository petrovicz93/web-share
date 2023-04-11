import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Profile = (props) => {
  return (
    <div className="profile_page-menu">
      <Nav className="flex-column">
        <Link
          className={
            window.location.pathname.indexOf('/profile/settings') !== -1
              ? 'active'
              : ''
          }
          to={`${process.env.PUBLIC_URL}/profile/settings`}
        >
          Settings
        </Link>
        <Link
          className={
            window.location.pathname.indexOf('/profile/notifications') !== -1
              ? 'active'
              : ''
          }
          to={`${process.env.PUBLIC_URL}/profile/notifications`}
        >
          Notifications
        </Link>
        <Link
          className={
            window.location.pathname.indexOf('/profile/payments') !== -1
              ? 'active'
              : ''
          }
          to={`${process.env.PUBLIC_URL}/profile/payments`}
        >
          Payments
        </Link>
        <Link
          className={
            window.location.pathname.indexOf('/profile/security') !== -1
              ? 'active'
              : ''
          }
          to={`${process.env.PUBLIC_URL}/profile/security`}
        >
          Security Information
        </Link>
      </Nav>
    </div>
  );
};

const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
