import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

//FORM UTILS
import { isEmail, isCellNumber, isEqual } from '../../utils/validator';

//FORM MODULES
import UserTextFields from './MemberTextFields';

//GENERAL
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
//CONTEXT
import { MemberContext } from './MemberContext';
import {
  getMemberLocationInfo,
  saveSignUpSession,
  clearSignUpSession,
} from '../../redux/actions/member';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8, 12),
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4, 6),
    },
  },
  center: {
    textAlign: 'center',
  },
  content: {
    padding: theme.spacing(3, 0, 3, 5),
  },
  buttonsContainer: {
    margin: theme.spacing(1, 0),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: '52px',
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

//MAIN COMPONENT
const Form = (props) => {
  const classes = useStyles();
  const [errors] = React.useState({});
  const [state, setState] = useContext(MemberContext);

  useEffect(() => {
    restoreSignUpSession();
    props.getMemberLocationInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setFormLocationData(props.member.locationInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.member.locationInfo]);

  const validateForm = () => {
    const { user } = state;
    const {
      email,
      confirmEmail,
      cellNumber,
      confirmCellNumber,
      password,
      confirmPassword,
    } = user;

    if (email) {
      handleError('email', '');
    }

    if (!isEmail(email)) {
      handleError('email', 'Please provide correct Email.');
      return false;
    } else {
      handleError('email', '');
    }

    if (!isEmail(email, confirmEmail)) {
      handleError('confirmEmail', "Email's must be same.");
      return false;
    } else {
      handleError('confirmEmail', '');
    }

    if (!isCellNumber(cellNumber)) {
      handleError('cellNumber', 'Please provide correct Cell Number.');
      return false;
    } else {
      handleError('cellNumber', '');
    }

    if (!isEqual(cellNumber, confirmCellNumber)) {
      handleError('confirmCellNumber', "Cell Number's must be same.");
      return false;
    } else {
      handleError('confirmCellNumber', '');
    }

    if (password) {
      handleError('password', '');
    }

    if (!isEqual(password, confirmPassword)) {
      handleError('confirmPassword', "Password's must be same.");
      return false;
    } else {
      handleError('confirmPassword', '');
    }
    return true;
  };
  const handleChange = (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    if (e.target.name === 'country' || e.target.name === 'dob') {
      saveFieldToSignUpSession(e.target.name, e.target.value);
    }

    setState({
      ...state,
      user: { ...state.user, [e.target.name]: value },
      errors: { ...state.errors, [e.target.name]: '' },
    });
  };
  const handleBlur = (e) => {
    saveFieldToSignUpSession(e.target.name, e.target.value);
  };
  const handleError = (name, validationMessage) => {
    setState({
      ...state,
      errors: { ...state.errors, [name]: validationMessage },
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('form submitted successfully....', state, errors);
      alert(`${state.user.firstName} user form submitted successfully.`);
      props.clearSignUpSession(); //clear signUpSession on successfull signup
    }
  };
  const restoreSignUpSession = () => {
    let signupSession = getSignupSession(),
      { user } = state;

    if (signupSession) {
      let fieldNames = Object.keys(signupSession),
        fromTime = signupSession['fromTime'];
      if (isLessThanOneHour(fromTime)) {
        fieldNames.forEach((name) => {
          user[name] = signupSession[name];
        });
        setState({
          ...state,
          user,
        });
      } else {
        props.clearSignUpSession();
      }
    }
  };
  const saveFieldToSignUpSession = (key, value) => {
    let signUpSession = getSignupSession();
    if (signUpSession) {
      signUpSession[key] = value;
    } else {
      signUpSession = {};
      signUpSession[key] = value;
    }
    signUpSession['fromTime'] = new Date();

    props.saveSignUpSession(JSON.stringify(signUpSession));
  };
  const setFormLocationData = (locationInfo) => {
    let { user } = state;
    if (locationInfo) {
      user['country'] = locationInfo.countryCode
        ? locationInfo.countryCode
        : null;
      user['state'] = locationInfo.regionName ? locationInfo.regionName : null;
      user['city'] = locationInfo.city ? locationInfo.city : null;
      user['postalCode'] = locationInfo.zip ? locationInfo.zip : null;

      setState({
        ...state,
        user,
      });
    }
  };

  const isLessThanOneHour = (date) => {
    let ONE_HOUR = 60 * 60 * 1000; /* ms */
    return new Date() - new Date(date) < ONE_HOUR;
  };
  const getSignupSession = () => {
    let signupSessionString =
        (props.member && props.member.signUpSession) || '',
      signupSession;
    if (signupSessionString !== '') {
      signupSession = JSON.parse(signupSessionString);
    }
    return signupSession;
  };
  return (
    <Grid item xs={12} md={8}>
      <Fragment>
        <form
          onSubmit={handleSubmit}
          onInvalid={(e) =>
            handleError(e.target.name, e.target.validationMessage)
          }
          onChange={handleChange}
          onBlur={handleBlur}
          className={classes.content}
        >
          <UserTextFields handleChange={handleChange} />
          <Grid
            className={classes.buttonsContainer}
            item
            container
            xs={12}
            sm={10}
            md={10}
            lg={10}
          >
            <Button
              type="submit"
              className={classes.button}
              variant="contained"
              color="primary"
              size="large"
            >
              Submit
            </Button>
          </Grid>
        </form>
      </Fragment>
    </Grid>
  );
};

Form.propTypes = {
  member: PropTypes.object,
  getMemberLocationInfo: PropTypes.func,
};

const mapStateToProps = (state) => ({
  member: state.member,
});
const mapDispatchToProps = (dispatch) => {
  return {
    getMemberLocationInfo: () => {
      dispatch(getMemberLocationInfo());
    },
    saveSignUpSession: (formData) => {
      dispatch(saveSignUpSession(formData));
    },
    clearSignUpSession: () => {
      dispatch(clearSignUpSession());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
