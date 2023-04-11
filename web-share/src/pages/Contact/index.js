import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { defineMessages, FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';

import Layout from '../Sections/Layout';
import Avatar from '../../components/Avatar';

import { borderColor, textLight } from '../../utils/colors';

import { loadContacts } from '../../redux/actions/contact';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade('#8ea4c6', 0.15),
    '&:hover': {
      backgroundColor: fade('#8ea4c6', 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: '350px',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      '&:focus': {
        width: '100%',
      },
    },
  },
  tableGrid: {
    width: '1024px',
    maxWidth: '100%',
    padding: theme.spacing(4, 4, 4, 4),
  },
  tableHeader: {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: borderColor,
    paddingBottom: theme.spacing(1),
    '& span': {
      fontWeight: 'bold',
      fontSize: '1rem',
      whiteSpace: 'nowrap',
      color: textLight,
    },
  },
  tableBody: {
    marginTop: theme.spacing(3),
  },
  tableRow: {
    marginTop: theme.spacing(2),
  },
  tableCell: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
  },
  contactAvatar: {
    width: '50px',
    height: '50px',
    marginRight: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    fontWeight: 'bold',
    fontSize: '20px',
    color: 'white',
  },
  contactName: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1)
  },
  label: {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '& span': {
      whiteSpace: 'nowrap'
    },
  }
}));

const messages = defineMessages({
  name: {
    id: 'app.contacts.table.header.name',
    defaultMessage: 'Name',
  },
  email: {
    id: 'app.contacts.table.header.email',
    defaultMessage: 'Email',
  },
  phoneNumber: {
    id: 'app.contacts.table.header.phoneNumber',
    defaultMessage: 'Phone Number',
  },
  country: {
    id: 'app.contacts.table.header.country',
    defaultMessage: 'Country',
  },
});

const Contact = (props) => {
  const classes = useStyles();

  const [searchKey, setSearchKey] = useState('');
  const { loadContacts } = props;

  const search = (event) => {
    setSearchKey(event.target.value);
  };

  useEffect(() => {
    loadContacts({ search_key: searchKey });
  }, [searchKey, loadContacts]);

  const renderHeader = () => (
    <div className={classes.tableHeader}>
      <Grid container>
        <Grid item xs={4}>
          <FormattedMessage {...messages.name}>
            {(txt) => <span>{txt}</span>}
          </FormattedMessage>
        </Grid>
        <Grid item xs={2}>
          <FormattedMessage {...messages.email}>
            {(txt) => <span>{txt}</span>}
          </FormattedMessage>
        </Grid>
        <Grid item xs={2}>
          <FormattedMessage {...messages.phoneNumber}>
            {(txt) => <span>{txt}</span>}
          </FormattedMessage>
        </Grid>
        <Grid item xs={2}>
          <FormattedMessage {...messages.country}>
            {(txt) => <span>{txt}</span>}
          </FormattedMessage>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );

  const renderBody = (data) => (
    <div className={classes.tableBody}>
      {data.length > 0 &&
        data.map((x, index) => (
          <Grid
            container
            className={classes.tableRow}
            key={`contact_${x.member_id}`}
          >
            <Grid item xs={4}>
              <div className={classes.contactName}>
                <Avatar
                  className={classNames(classes.contactAvatar)}
                  name={`${x.first_name} ${x.last_name}`}
                  uuid={x.member_id}
                  alt={x.first_name}
                />
                <div className={classes.label}>
                  <span>{`${x.first_name} ${x.last_name}`}</span>
                </div>
              </div>
            </Grid>
            <Grid item xs={2} className={classes.tableCell}>
              <div className={classes.label}><span>{x.email}</span></div>
            </Grid>
            <Grid item xs={2}>
              <span></span>
            </Grid>
            <Grid item xs={2}>
              <span></span>
            </Grid>
            <Grid item xs={2} className={classes.tableCell}>
              <ShareIcon />
              <DeleteIcon />
            </Grid>
          </Grid>
        ))}
    </div>
  );

  return (
    <Layout {...props}>
      <div className="contacts">
        <Toolbar variant="dense">
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={searchKey}
              onChange={search}
            />
          </div>
        </Toolbar>
        <div className={classes.tableGrid}>
          {renderHeader()}
          {renderBody(props.contacts)}
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  contacts: state.contact.contacts,
});

const mapDispatchToProps = (dispatch) => {
  return { dispatch, ...bindActionCreators({ loadContacts }, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
