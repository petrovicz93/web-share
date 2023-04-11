import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown, Button } from 'react-bootstrap';
import ReactFlagsSelect from 'react-flags-select';
import { bindActionCreators } from 'redux';

import Counter from '../../../components/Counter';
import ProfileCustomToggle from './ProfileCustomToggle';
import MemberInvite from '../../../components/Modal/Invite';
import { injectIntl } from 'react-intl';
import accountAvatar from '../../../assets/img/account-avatar.png';
import logoPng from '../../../assets/img/logo-small.png';
import clockPng from '../../../assets/img/clock.png';
import goPng from '../../../assets/img/go.png';
import alertPng from '../../../assets/img/alert.png';
import communicationPng from '../../../assets/img/communication.png';
import { logout } from '../../../redux/actions/member';
import { Redirect } from 'react-router-dom';
import SharedIcon from '../../../components/Icons/SharedIcon';

import { countryCodes, languageCodes } from '../../../utils/language';
import { changeLocale } from '../../../redux/actions/app';

const Header = (props) => {
  const { member, session_id } = props.member;
  const {
    intl: { formatMessage },
  } = props;

  const [showInviteModal, setShowInviteModal] = useState(false);
  const messages = {
    profile: { id: 'app.header.menu.my-profile', defaultMessage: 'My Profile' },
    inviteMember: {
      id: 'app.header.menu.invite-member',
      defaultMessage: 'Invite User',
    },
    logout: { id: 'app.header.menu.logout', defaultMessage: 'Log Out' },
    upcomingVideoCall: {
      id: 'app.header.upcomingVideoCall',
      defaultMessage: 'Upcoming Video Call',
    },
  };

  const onLogout = () => {
    props.logout(JSON.stringify(member));
  };

  const changeLanguage = (countryCode) => {
    const index = countryCodes.findIndex((x) => x === countryCode);
    props.changeLocale(languageCodes[index]);
  };

  const country =
    countryCodes[languageCodes.findIndex((x) => x === props.locale)];

  if (!session_id) {
    return <Redirect to={`${process.env.PUBLIC_URL}/login`} />;
  }

  return (
    <React.Fragment>
      <div className="header">
        <div className="logo">
          <img src={logoPng} alt="logo" />
        </div>
        <div className="header-items">
          <div className="upcoming-video-call">
            <div className="label">
              {formatMessage(messages.upcomingVideoCall)}
            </div>
            <img src={clockPng} alt="clock" />
            <span className="time">4:35 PM</span>
            <img src={goPng} alt="go" />
          </div>
          <div>
            <ReactFlagsSelect
              countries={countryCodes}
              customLabels={{ US: 'English', DE: 'Germany', JP: 'Japanese' }}
              defaultCountry={country}
              alignOptions="left"
              onSelect={changeLanguage}
            />

            <Button
              className="invite-btn"
              variant="success"
              onClick={() => setShowInviteModal(true)}
            >
              Invite User
            </Button>
            <Link to={`${process.env.PUBLIC_URL}/contacts`}>
              <SharedIcon width="55" height="60" className="dark-icon" />
            </Link>
            <Link to={`${process.env.PUBLIC_URL}/share`}>
              <div className="with-counter header-icon">
                <img src={communicationPng} alt="notification" />
                <Counter count={0} />
              </div>
            </Link>
            <Link to={`${process.env.PUBLIC_URL}/profile`}>
              <div className="with-counter header-icon">
                <img src={alertPng} alt="alert" />
                <Counter count={0} />
              </div>
            </Link>
            <div className="account-avatar ml-5 mr-4">
              <img className="avatar" src={accountAvatar} alt="avatar" />
            </div>
            <Dropdown>
              <Dropdown.Toggle as={ProfileCustomToggle} id="dropdown-basic">
                {member.first_name}
                <br />
                {member.last_name}
              </Dropdown.Toggle>
              <Dropdown.Menu className="header-dropdown">
                <Dropdown.Item
                  to={`${process.env.PUBLIC_URL}/profile`}
                  as={Link}
                >
                  {formatMessage(messages.profile)}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setShowInviteModal(true)}>
                  {formatMessage(messages.inviteMember)}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => onLogout()}>
                  {formatMessage(messages.logout)}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      <MemberInvite
        show={showInviteModal}
        close={() => setShowInviteModal(false)}
      ></MemberInvite>
    </React.Fragment>
  );
};

Header.propTypes = {
  changeLocale: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = (state) => ({
  member: state.member,
  locale: state.global.locale,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ changeLocale, logout }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Header));