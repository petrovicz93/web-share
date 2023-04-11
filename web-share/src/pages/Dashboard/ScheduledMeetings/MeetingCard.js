import 'date-fns';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import { Col } from 'react-bootstrap';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CheckTwoToneIcon from '@material-ui/icons/CheckTwoTone';
import CloseIcon from '@material-ui/icons/Close';

import { eventDateFormat, formatAMPM } from '../../../utils/dateFormat';

import MemberAvatar from '../../../assets/img/avatar.jpg'

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const MeetingCard = (props) => {
  const classes = useStyles();
  const {member} = props;
  return (
    <Card>
      <CardHeader
        avatar={
          member.image?
          <Avatar
            alt={`${member.first_name} ${member.last_name}`}
            src={MemberAvatar}
          /> :
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
          >
            {member.first_name[0]}{member.last_name[0]}
          </Avatar>
        }
        title={`${member.first_name} ${member.last_name}`}
        subheader={member.role}
      />
      <CardContent className="mt-3">
        <List dense={true}>
          <ListItem>
            <ListItemIcon>
              <LocationOnIcon className="location-icon" />
            </ListItemIcon>
            <ListItemText
              primary={member.location}
            />
          </ListItem>
          <ListItem className="event-date-time">
            <List>
              <ListItem>
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText
                  primary={eventDateFormat(member.event_date)}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ScheduleIcon />
                </ListItemIcon>
                <ListItemText
                  primary={formatAMPM(member.event_date)}
                />
              </ListItem>
            </List>
          </ListItem>
        </List>
      </CardContent>
      <CardActions disableSpacing className="mt-3">
        <Col sm={6}>  
          <IconButton aria-label="Confirm" className="meeting-card_btn confirm_btn">
            <CheckTwoToneIcon />
            Confirm
          </IconButton>
        </Col>
        <Col sm={6}>  
          <IconButton aria-label="Cancel" className="meeting-card_btn cancel_btn">
            <CloseIcon />
            Cancel
          </IconButton>
        </Col>
      </CardActions>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingCard);