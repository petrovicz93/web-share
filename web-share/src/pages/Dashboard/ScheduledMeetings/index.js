import 'date-fns';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Row } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import MeetingCard from './MeetingCard';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const meetingMembers = [{
  id: 1,
  first_name: 'Maximus',
  last_name: 'Capf',
  role: 'Team Lead',
  location: 'Main Medical Centre. 22 Satsen Pr, Paris',
  country: 'France',
  event_date: '2020-07-10 8:40',
  image: 'image'
}, {
  id: 2,
  first_name: 'Orlan',
  last_name: 'Luca',
  role: 'CEO at ArIt',
  location: 'Marcelo Torcuato de Alvear 636, CABA',
  country: 'Argentina',
  event_date: '2020-07-11 16:00',
  image: ''
}, {
  id: 3,
  first_name: 'Martin',
  last_name: 'Martin',
  role: 'CEO at ArIt',
  location: 'Marcelo Torcuato de Alvear 636, CABA',
  country: 'Argentina',
  event_date: '2020-07-12 20:00',
  image: ''
}]

const ScheduledMeetings = (props) => {
  const classes = useStyles();
  const [value, selectValue] = useState('date')
  const handleChange = (event) => {
    selectValue(event.target.value);
  };

  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreHorizIcon />
          </IconButton>
        }
        title="Scheduled Meetings"
      />
      <CardContent>
        <Row className="schedule-meeting_content-header">
          <Col md={4} className="upcoming-pass_btn">
            <IconButton aria-label="Upcoming" className="upcoming_btn">
              Upcoming
            </IconButton>
            <IconButton aria-label="Past" className="pass_btn">
              Past
            </IconButton>
          </Col>
          <Col md={4} className="carousel-arrow">
            
          </Col>
          <Col md={4} className="sort-meeting-list">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="sort-select" id="sort-select-label">Sort by</InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                value={value}
                onChange={handleChange}
              >
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="name">Name</MenuItem>
              </Select>
            </FormControl>
          </Col>
        </Row>
        <Row className="meeting-card-list mt-4">
          {meetingMembers.map((member) => (
            <Col md={4} className="meeting-card" key={member.id}>
              <MeetingCard member={member} />
            </Col>
          ))}
        </Row>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduledMeetings);
