import React from 'react';
import { Hidden, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LeftSideHeaderImage from '../../assets/img/amera-signup-image.jpg';

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(5),
    textAlign: 'center',
    backgroundImage: `url(${LeftSideHeaderImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  title: {
    color: theme.palette.primary.contrastText,
    marginTop: '58vh',
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    color: theme.palette.primary.contrastText,
  },
}));

const SignUpHeader = () => {
  const classes = useStyles();
  return (
    <Hidden only={['xs', 'sm']}>
      <Grid item className={classes.header} xs={12} md={4} lg={false}>
        <Typography variant="h4" className={classes.title}>
          Create Account
        </Typography>
        <Typography variant="h6" className={classes.subtitle}>
          with us
        </Typography>
      </Grid>
    </Hidden>
  );
};
export default SignUpHeader;
