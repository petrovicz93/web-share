import 'date-fns';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const GroupEvents = (props) => {
  const [date, changeDate] = useState(new Date());

  return (
    <div className="calendar_page-body">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          autoOk
          orientation="landscape"
          variant="static"
          openTo="date"
          value={date}
          onChange={changeDate}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupEvents);
