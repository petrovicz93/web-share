import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import logoPng from '../../assets/img/logo.png';
import { Redirect } from 'react-router-dom';

import { isEmail } from '../../utils/validator';
import { login } from '../../redux/actions/member';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#94C03D',
    },
  },
});

const Login = (props) => {
  const { dispatch, member } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [pwdErr, setPwdErr] = useState(false);
  const [loginErr, setLoginErr] = useState(false);
  const passwordRef = React.useRef();

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
    setEmailErr(false);
    setLoginErr(false);
  };
  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
    setPwdErr(false);
    setLoginErr(false);
  };
  const handlePasswordKeyChange = (evt) => {
    if (evt.key === 'Enter') {
      onLogin();
    }
  };
  const handleEmailKeyChange = (evt) => {
    if (evt.key === 'Enter') {
      passwordRef.current.focus();
    }
  };
  const onLogin = async () => {
    const formData = { username: email, password };

    if (!isEmail) {
      setEmailErr(true);
      return;
    }

    if (!password) {
      setPwdErr(true);
      return;
    }
    dispatch(login(JSON.stringify(formData)));
  };

  if (member.session_id) {
    return <Redirect to={`${process.env.PUBLIC_URL}/dashboard`} />;
  }

  return (
    <div className="login-page">
      <ThemeProvider theme={theme}>
        <div className="login-page_form">
          <div className="login_form-logo">
            <img src={logoPng} alt="logo" />
          </div>
          <div className="login_form-row">
            <TextField
              error={emailErr}
              helperText={emailErr && 'Wrong Email Address!'}
              label="Email"
              variant="outlined"
              color="primary"
              value={email}
              onChange={handleEmailChange}
              onKeyDown={handleEmailKeyChange}
            />
          </div>
          <div className="login_form-row">
            <TextField
              inputRef={passwordRef}
              error={pwdErr}
              helperText={pwdErr && "Password can't be blank!"}
              label="Password"
              variant="outlined"
              color="primary"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              onKeyDown={handlePasswordKeyChange}
            />
          </div>
          {loginErr && (
            <div className="label-error">
              You've entered wrong email or password!
            </div>
          )}
          <div className="login_form-footer">
            <Button variant="contained" color="primary" onClick={onLogin}>
              LogIn
            </Button>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = (state) => ({
  member: state.member,
});

export default connect(mapStateToProps)(Login);
