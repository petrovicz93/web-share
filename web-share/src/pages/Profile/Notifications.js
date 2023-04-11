import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Menu from './Menu';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const newTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#888b8c',
    },
  },
});

const ColorButton = withStyles((theme) => ({
  root: {
    color: '#FFFFFF',
    backgroundColor: '#94C03D',
    '&:hover': {
      backgroundColor: '#94C03D',
    },
  },
}))(Button);

const Notifications = (props) => {
  const [appAlertMessage, setAppAlertMessage] = useState(true);
  const [appAlertFavorite, setAppAlertFavorite] = useState(true);
  const [emailMessage, setEmailMessage] = useState(true);
  const [emailFavorite, setEmailFavorite] = useState(true);
  const [emailViewProfile, setEmailViewProfile] = useState(true);
  const [emailNewMember, setEmailNewMember] = useState(true);
  const [emailProfileChange, setEmailProfileChange] = useState(true);
  const [emailVerification, setEmailVerification] = useState(true);
  const [emailEvent, setEmailEvent] = useState(true);
  const [emailNews, setEmailNews] = useState(true);
  const [emailPromotions, setEmailPromotions] = useState(true);

  const unsubscribeAll = () => {
    setAppAlertMessage(false);
    setAppAlertFavorite(false);
    setEmailMessage(false);
    setEmailFavorite(false);
    setEmailViewProfile(false);
    setEmailNewMember(false);
    setEmailProfileChange(false);
    setEmailVerification(false);
    setEmailEvent(false);
    setEmailNews(false);
    setEmailPromotions(false);
  };

  return (
    <div className="profile_page-body">
      <ThemeProvider theme={newTheme}>
        <Menu />
        <div className="profile_page-notifications">
          <div className="profile_page-title">Notifications</div>
          <div className="profile_page-section">
            <div className="page_section-row">
              <div className="section-row_label">
                Show me in-app alerts when someone...
              </div>
            </div>
            <div className="page_section-row--sub">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={appAlertMessage}
                    onChange={() => setAppAlertMessage(!appAlertMessage)}
                    color="primary"
                  />
                }
                label="Sends me a message"
              />
            </div>
            <div className="page_section-row--sub">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={appAlertFavorite}
                    onChange={() => setAppAlertFavorite(!appAlertFavorite)}
                    color="primary"
                  />
                }
                label="Add me as a favorite"
              />
            </div>
            <div className="page_section-row">
              <div className="section-row_label">
                Send me an email when someone...
              </div>
            </div>
            <div className="page_section-row--sub">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={emailMessage}
                    onChange={() => setEmailMessage(!emailMessage)}
                    color="primary"
                  />
                }
                label="Sends me a message"
              />
            </div>
            <div className="page_section-row--sub">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={emailFavorite}
                    onChange={() => setEmailFavorite(!emailFavorite)}
                    color="primary"
                  />
                }
                label="Adds me as a favorite"
              />
            </div>
            <div className="page_section-row--sub">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={emailViewProfile}
                    onChange={() => setEmailViewProfile(!emailViewProfile)}
                    color="primary"
                  />
                }
                label="Views my profile"
              />
            </div>
            <div className="page_section-row">
              <div className="section-row_label">Also email me about...</div>
            </div>
            <div className="page_section-row--sub">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={emailNewMember}
                    onChange={() => setEmailNewMember(!emailNewMember)}
                    color="primary"
                  />
                }
                label="New members & matches"
              />
            </div>
            <div className="page_section-row--sub">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={emailProfileChange}
                    onChange={() => setEmailProfileChange(!emailProfileChange)}
                    color="primary"
                  />
                }
                label="When my profile changes are approved"
              />
            </div>
            <div className="page_section-row--sub">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={emailVerification}
                    onChange={() => setEmailVerification(!emailVerification)}
                    color="primary"
                  />
                }
                label="Verifications & Information requests"
              />
            </div>
            <div className="page_section-row--sub">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={emailEvent}
                    onChange={() => setEmailEvent(!emailEvent)}
                    color="primary"
                  />
                }
                label="Special events"
              />
            </div>
            <div className="page_section-row--sub">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={emailNews}
                    onChange={() => setEmailNews(!emailNews)}
                    color="primary"
                  />
                }
                label="News and updates"
              />
            </div>
            <div className="page_section-row--sub">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={emailPromotions}
                    onChange={() => setEmailPromotions(!emailPromotions)}
                    color="primary"
                  />
                }
                label="Promotions and other offers"
              />
            </div>
            <div className="page_section-row">
              <ColorButton variant="contained" color="primary">
                Save Changes
              </ColorButton>
            </div>
            <div className="page_section-row">
              <Link
                to="#"
                className="page_section-button--text"
                onClick={() => unsubscribeAll()}
              >
                UnsubscribeAll
              </Link>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
