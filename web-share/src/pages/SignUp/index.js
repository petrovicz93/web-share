import React from 'react';
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import MemberContextProvider from './MemberContext';
import FormHeader from './FormHeader';
import Form from './Form';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#94C03D',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#94C03D',
    },
    error: {
      main: '#C70000',
    },
  },
  typography: {
    fontFamily: ['Roboto-Bold', 'Helvetica Neue', 'sans-serif'].join(','),
    fontSize: 14,
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: 'hidden',
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4, 6),
  },
  formContainer: {
    minHeight: '100vh',
    alignContent: 'stretch',
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <MemberContextProvider>
      <ThemeProvider theme={theme}>
        <Grid className={classes.root}>
          <Grid container className={classes.formContainer}>
            <FormHeader />
            <Form />
          </Grid>
        </Grid>
      </ThemeProvider>
    </MemberContextProvider>
  );
};
