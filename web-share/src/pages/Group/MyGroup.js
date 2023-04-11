import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import CardContainer from './CardContainer';
import ListContainer from './ListContainer';

import { getGroupList } from '../../redux/actions/group';

const MyGroup = (props) => {
  const { member, dispatch } = props;
  const [viewCard, setViewCard] = useState(true);

  const [view, setView] = React.useState('module');
  const handleChange = (event, nextView) => {
    setView(nextView);
    if (nextView && nextView === 'module') {
      setViewCard(true);
    } else if (nextView && nextView === 'list') {
      setViewCard(false);
    }
  };

  useEffect(() => {
    dispatch(getGroupList(member.member_id));
  }, [dispatch, member]);

  return (
    <React.Fragment>
      <div className="group-section">
        <div className="toggle-button-group">
          <ToggleButtonGroup value={view} exclusive onChange={handleChange}>
            <ToggleButton value="module" aria-label="module">
              <ViewModuleIcon />
            </ToggleButton>
            <ToggleButton value="list" aria-label="list">
              <ViewListIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        {viewCard ? (
          <CardContainer></CardContainer>
        ) : (
          <ListContainer></ListContainer>
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  member: state.member.member,
  groupList: state.group.groupList,
});

export default connect(mapStateToProps)(MyGroup);
