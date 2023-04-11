import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Menu from './Menu';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

const SecurityInformation = (props) => {
  const [securityQuestion, setSecurityQuestion] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="profile_page-body">
      <Menu />
      <div className="profile_page-security">
        <div className="profile_page-title">Security Information</div>
        <div className="profile_page-section">
          <div className="page_section-row">
            <div className="section-row_label--sub">
              Here are our options to give your account some additional security
            </div>
          </div>
          <div className="page_section-row">
            <div className="section-row_label">Security Questions</div>
          </div>
          <div className="page_section-row flex-column">
            <div className="section-row_label--sub">
              Security questions will be used for password recovery if you
              forgot your password and cannot access your email.
            </div>
            <ButtonGroup toggle>
              <ToggleButton
                className="btn-green--bg"
                type="radio"
                variant="secondary"
                name="radio"
                checked={securityQuestion}
                onClick={() => setSecurityQuestion(true)}
              >
                Enable
              </ToggleButton>
              <ToggleButton
                className="btn-green--bg"
                type="radio"
                variant="secondary"
                name="radio"
                checked={!securityQuestion}
                onClick={() => setSecurityQuestion(false)}
              >
                Disable
              </ToggleButton>
            </ButtonGroup>
          </div>
        </div>
        <div className="profile_page-section">
          <div className="page_section-row">
            <div className="section-row_label">Two Factor Authentication</div>
          </div>
          <div className="page_section-row flex-column">
            <div className="section-row_label--sub">
              Two-Factor authentication adds an extra layer of security to your
              account. The first time you log in from any device or when you
              rest your password you will be sent a text message with in a
              unique code. This code will be required to log in, meaning someone
              would need both your password and access to your phone to log into
              your account.
            </div>
            <ButtonGroup toggle>
              <ToggleButton
                className="btn-green--bg"
                type="radio"
                variant="secondary"
                name="radio"
                checked={twoFactor}
                onClick={() => setTwoFactor(true)}
              >
                Enable
              </ToggleButton>
              <ToggleButton
                className="btn-green--bg"
                type="radio"
                variant="secondary"
                name="radio"
                checked={!twoFactor}
                onClick={() => setTwoFactor(false)}
              >
                Disable
              </ToggleButton>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecurityInformation);
