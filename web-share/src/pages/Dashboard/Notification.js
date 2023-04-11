import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PlayCircleFilledRoundedIcon from '@material-ui/icons/PlayCircleFilledRounded';
import EventIcon from '@material-ui/icons/Event';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';

import { eventDateFormat } from '../../utils/dateFormat';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 15,
  },
  canceled: {
    backgroundColor: '#ed7756'
  },
  notification: {
    backgroundColor: '#94c03d'
  },
  dot: {
    color: '#ffc710'
  }
}));

const notifications = [{
  id: 1,
  type: 'canceled',
  members: [{
    first_name: 'Alisa',
    last_name: 'Wanshi',
    group: 'Group 1',
  }],
  canceled_date: '2020-7-21',
}, {
  id: 2,
  type: 'visit',
  members: [{
    first_name: 'Veronica',
    last_name: 'Hops',
    group: 'Group 1',
  }, {
    first_name: 'Albert',
    last_name: 'Novikov',
    group: 'Group 2',
  }, {
    first_name: 'Marta',
    last_name: 'Krouf',
    group: 'Group 3',
  }]
}, {
  id: 3,
  type: 'canceled',
  members: [{
    first_name: 'Alisa',
    last_name: 'Wanshi',
    group: 'Group 1',
  }],
  canceled_date: '2020-7-21',
}]

const Notifications = (props) => {

  const classes = useStyles();

  const NotificationCard = ({notification}) => {
    return (
      <Card className={
        notification.type === 'canceled' ? 
        [classes.root, classes.canceled] : [classes.root, classes.notification] }>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreHorizIcon />
            </IconButton>
          }
          title={
            notification.type === 'canceled' ? "Canceled visits" : "Notifications"
          }
          subheader={
            notification.type === 'canceled' ? 
            "You have 1 canceled visit:" : `You have ${notification.members.length} visits today`}
        />
        <CardContent>
          <Grid item>
            {notification.type === 'canceled' ? (
              <List dense={true}>
                <ListItem>
                  <ListItemText
                    primary={`${notification.members[0].first_name} ${notification.members[0].last_name} - ${notification.members[0].group}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <PlayCircleFilledRoundedIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem className="canceled-date">
                  <ListItemIcon>
                    <EventIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={eventDateFormat(notification.canceled_date)}
                  />
                </ListItem>
              </List>
            ) : (
              <List dense={true}>
                {notification.members.map((member, index) => (
                  <div key={index}>
                    <ListItem className="notification-member-group">
                      <ListItemIcon>
                        <FiberManualRecordSharpIcon className="dot-icon" />
                      </ListItemIcon>
                      <ListItemText
                        className="notification-member"
                        primary={`${member.first_name} ${member.last_name}`}
                      />
                      <ListItemText
                        className="notification-group"
                        primary={member.group}
                      />
                  </ListItem>
                  </div>
                ))}
              </List>
            )}
          </Grid>
        </CardContent>
      </Card>
    )
  }

  return (
    notifications.map((notification) => (
      <NotificationCard key={notification.id} notification={notification} />
    ))
  );
};

const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
