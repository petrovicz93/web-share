import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Menu from './Menu';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 22,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(19px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 20,
    height: 20,
  },
  track: {
    borderRadius: 20 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const Settings = (props) => {
  const [yourActivity, setYourActivity] = useState(true);
  const [otherProfile, setOtherProfile] = useState(true);
  const [measurementSystem, setMeasurementSystem] = useState(true);

  return (
    <div className="profile_page-body">
      <Menu />
      <div className="profile_page-settings">
        <div className="profile_page-title">Settings</div>
        <div className="profile_page-section">
          <div className="page_section-row">
            <div className="section-row_label">Email</div>
            <div className="section-row_label--small">test123@test.com</div>
            <div className="section-row_label--button">Edit</div>
          </div>
          <div className="page_section-row">
            <div className="section-row_label">Smart Phone</div>
            <div className="section-row_label--small">512.421.5153</div>
            <div className="section-row_label--button">Edit</div>
          </div>
        </div>
        <div className="profile_page-section">
          <div className="page_section-row">
            <div className="section-row_label">Password</div>
            <div className="section-row_label--button">Change Password</div>
          </div>
          <div className="page_section-row flex-column">
            <div className="section-row_label">Your Activity</div>
            <ButtonGroup toggle>
              <ToggleButton
                className="btn-green--bg"
                type="radio"
                variant="secondary"
                name="radio"
                checked={yourActivity}
                onClick={() => setYourActivity(true)}
              >
                Visible
              </ToggleButton>
              <ToggleButton
                className="btn-green--bg"
                type="radio"
                variant="secondary"
                name="radio"
                checked={!yourActivity}
                onClick={() => setYourActivity(false)}
              >
                Hidden
              </ToggleButton>
            </ButtonGroup>
          </div>
          <div className="page_section-row align-center">
            <div className="section-row_label--small">
              Online Status / LastActiveDate
            </div>
            <IOSSwitch name="checkedB" />
          </div>
          <div className="page_section-row align-center">
            <div className="section-row_label--small">
              When You View Someone
            </div>
            <IOSSwitch name="checkedB" />
          </div>
          <div className="page_section-row align-center">
            <div className="section-row_label--small">
              When You Favorite Someone
            </div>
            <IOSSwitch name="checkedB" />
          </div>
        </div>
        <div className="profile_page-section">
          <div className="page_section-row flex-column">
            <div className="section-row_label">Other Profile Information</div>
            <ButtonGroup toggle>
              <ToggleButton
                className="btn-green--bg"
                type="radio"
                variant="secondary"
                name="radio"
                checked={otherProfile}
                onClick={() => setOtherProfile(true)}
              >
                Visible
              </ToggleButton>
              <ToggleButton
                className="btn-green--bg"
                type="radio"
                variant="secondary"
                name="radio"
                checked={!otherProfile}
                onClick={() => setOtherProfile(false)}
              >
                Hidden
              </ToggleButton>
            </ButtonGroup>
          </div>
          <div className="page_section-row align-center">
            <div className="section-row_label--small">Join Date</div>
            <IOSSwitch name="checkedB" />
          </div>
          <div className="page_section-row align-center">
            <div className="section-row_label--small">
              Recent Login Location
            </div>
            <IOSSwitch name="checkedB" />
          </div>
        </div>
        <div className="profile_page-section">
          <div className="page_section-row flex-column">
            <div className="section-row_label">
              Preferred Measurement System
            </div>
            <ButtonGroup toggle>
              <ToggleButton
                className="btn-green--bg"
                type="radio"
                variant="secondary"
                name="radio"
                checked={measurementSystem}
                onClick={() => setMeasurementSystem(true)}
              >
                Imperial
              </ToggleButton>
              <ToggleButton
                className="btn-green--bg"
                type="radio"
                variant="secondary"
                name="radio"
                checked={!measurementSystem}
                onClick={() => setMeasurementSystem(false)}
              >
                Metric
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
