import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  FormControlLabel,
  Select,
  RadioGroup,
  Radio,
  Avatar,
  Button,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import ProfilePictureCoverImage from '../../assets/img/profile-picture-cover.png';
import { MemberContext } from './MemberContext';
import { Countries } from '../../utils/country';

const useStyles = makeStyles((theme) => ({
  typography: {
    fontWeight: '600',
  },
  nameInput: {
    width: '100%',
    marginBottom: '14px',
  },
  fieldsMargin: {
    margin: 0,
  },
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
  profilePic: {
    width: theme.spacing(18),
    height: theme.spacing(18),
  },
  uploadInput: {
    display: 'none',
  },
  uploadButton: {
    fontSize: 13,
  },
  twoFactorAuth: {
    padding: theme.spacing(1),
  },
}));

function onImageSelect(e) {
  const input = document.getElementById('image-input');
  const profilePictureEl = document.getElementsByClassName('MuiAvatar-img')[0];
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      profilePictureEl.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

const MemberTextFields = (props) => {
  const classes = useStyles();
  const [state] = useContext(MemberContext);
  const { user, errors } = state;
  // const dateLimit = new Date();
  // dateLimit.setFullYear(dateLimit.getFullYear() - 18);
  return (
    <Grid container spacing={2}>
      <Grid container item>
        <Typography>CHECK IP: {user.publicIP}</Typography>
      </Grid>
      <Grid xs={11} sm={5} md={5} lg={5} container item>
        <Grid item container className={classes.nameInput}>
          <TextField
            placeholder="Type Your First Name"
            name="firstName"
            label="First Name"
            value={user.firstName}
            variant="outlined"
            required
            fullWidth
          />
        </Grid>
        <Grid item container className={classes.nameInput}>
          <TextField
            placeholder="Type Middle Name"
            name="middleName"
            label="Middle Name"
            value={user.middleName}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item container className={classes.nameInput}>
          <TextField
            placeholder="Type Last Name"
            name="lastName"
            label="Last Name"
            value={user.lastName}
            variant="outlined"
            required
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid
        xs={11}
        sm={5}
        md={5}
        lg={5}
        item
        container
        spacing={0}
        direction="column"
        justify="flex-start"
      >
        <Grid item container>
          <Typography variant="h6">Profile Picture</Typography>
        </Grid>
        <Grid item container direction="row" justify="center" spacing={1}>
          <Avatar
            alt="Profile Pic"
            src={ProfilePictureCoverImage}
            className={classes.profilePic}
          />
        </Grid>
        <Grid item>
          <div className={classes.root}>
            <input
              accept="image/*"
              className={classes.uploadInput}
              id="image-input"
              onChange={onImageSelect}
              multiple
              type="file"
            />
            <label htmlFor="image-input">
              <Button
                variant="contained"
                size="small"
                color="primary"
                component="span"
                className={classes.uploadButton}
                startIcon={<CloudUploadIcon />}
              >
                Upload
              </Button>
            </label>
          </div>
        </Grid>
      </Grid>
      <Grid item xs={11} sm={5} md={5} lg={5} style={{ marginTop: '0' }}>
        <TextField
          placeholder="Type User Name"
          name="userName"
          label="UserName"
          value={user.userName}
          variant="outlined"
          required
          fullWidth
          className={classes.fieldsMargin}
        />
      </Grid>
      <Grid item xs={11} sm={5} md={5} lg={5}>
        <Autocomplete
          name="country"
          options={Countries}
          classes={{
            option: classes.option,
          }}
          autoHighlight
          fullWidth
          onSelect={(e) =>
            props.handleChange({
              target: { name: 'country', value: e.target.value },
            })
          }
          className={classes.fieldsMargin}
          getOptionLabel={(option) => option.name}
          renderOption={(option) => (
            <React.Fragment>{option.name}</React.Fragment>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a country"
              variant="outlined"
            />
          )}
        />
      </Grid>
      <Grid item xs={11} sm={5} md={5} lg={5}>
        <TextField
          placeholder="Type Email"
          name="email"
          label="Email"
          value={user.email}
          type="email"
          variant="outlined"
          margin="normal"
          helperText={errors['email']}
          error={!!errors['email']}
          required
          fullWidth
          className={classes.fieldsMargin}
        />
      </Grid>
      <Grid item xs={11} sm={5} md={5} lg={5}>
        <TextField
          placeholder="Re-Type Email"
          name="confirmEmail"
          label="Confirm Email"
          value={user.confirmEmail}
          type="email"
          variant="outlined"
          margin="normal"
          helperText={errors['confirmEmail']}
          error={!!errors['confirmEmail']}
          required
          fullWidth
          className={classes.fieldsMargin}
        />
      </Grid>
      <Grid item xs={11} sm={5} md={5} lg={5}>
        <TextField
          placeholder="###-###-#### or ##########"
          name="cellNumber"
          label="Cell Number"
          value={user.cellNumber}
          helperText={errors['cellNumber']}
          type="text"
          variant="outlined"
          margin="normal"
          error={!!errors['cellNumber']}
          required
          fullWidth
          className={classes.fieldsMargin}
        />
      </Grid>
      <Grid item xs={11} sm={5} md={5} lg={5}>
        <TextField
          placeholder="Re-Type Cell Number"
          name="confirmCellNumber"
          label="Confirm Cell Number"
          value={user.confirmCellNumber}
          helperText={errors['confirmCellNumber']}
          type="text"
          variant="outlined"
          margin="normal"
          error={!!errors['confirmCellNumber']}
          required
          fullWidth
          className={classes.fieldsMargin}
        />
      </Grid>
      <Grid item xs={11} sm={5} md={5} lg={5}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk
            variant="inline"
            inputVariant="outlined"
            label="Date of Birth"
            placeholder=""
            name="dob"
            format="MM/dd/yyyy"
            value={user.dob}
            InputAdornmentProps={{ position: 'start' }}
            onChange={(date, dateString) =>
              props.handleChange({ target: { name: 'dob', value: dateString } })
            }
            fullWidth
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={11} sm={5} md={5} lg={5}>
        <FormControl required variant="outlined" fullWidth>
          <InputLabel id="selectGender">Gender</InputLabel>
          <Select
            labelId="selectGender"
            name="gender"
            value={user.gender}
            onChange={props.handleChange}
            label="MALE/FEMALE"
          >
            <MenuItem value="M">Male</MenuItem>
            <MenuItem value="F">Female</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={11} sm={3} md={3} lg={3}>
        <TextField
          placeholder="Type Postal Code"
          name="postalCode"
          value={user.postalCode}
          label="Postal Code"
          type="text"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          className={classes.fieldsMargin}
        />
      </Grid>
      <Grid item xs={11} sm={3} md={3} lg={3}>
        <TextField
          placeholder="Type City Name"
          name="city"
          label="City"
          value={user.city}
          type="text"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          className={classes.fieldsMargin}
        />
      </Grid>
      <Grid item xs={11} sm={4} md={4} lg={4}>
        <TextField
          placeholder="Type State Name"
          name="state"
          label="State"
          value={user.state}
          type="text"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          className={classes.fieldsMargin}
        />
      </Grid>
      <Grid item xs={11} sm={5} md={5} lg={5}>
        <TextField
          placeholder="Type Password"
          name="password"
          label="Password"
          value={user.password}
          type="password"
          variant="outlined"
          margin="normal"
          helperText={errors['password']}
          error={!!errors['password']}
          inputProps={{
            minLength: 8,
            maxLength: 20,
          }}
          required
          fullWidth
          className={classes.fieldsMargin}
        />
      </Grid>
      <Grid item xs={11} sm={5} md={5} lg={5}>
        <TextField
          placeholder="Type Confirm Password"
          label="Confirm Password"
          name="confirmPassword"
          value={user.confirmPassword}
          type="password"
          variant="outlined"
          margin="normal"
          helperText={errors['confirmPassword']}
          error={!!errors['confirmPassword']}
          inputProps={{
            minLength: 8,
            maxLength: 20,
          }}
          required
          fullWidth
          className={classes.fieldsMargin}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <FormControl component="fieldset">
          <Grid className={classes.twoFactorAuth}>
            <Typography>
              Do you want to enable multi factor authentication for login.
            </Typography>
            <RadioGroup
              row
              aria-label="twoFactorAuth"
              name="twoFactorAuth"
              value={user.twoFactorAuth}
            >
              <FormControlLabel value="Y" control={<Radio />} label="Yes" />
              <FormControlLabel value="N" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
        </FormControl>
      </Grid>
    </Grid>
  );
};

MemberTextFields.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default MemberTextFields;
