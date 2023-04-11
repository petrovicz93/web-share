import React from 'react';

import DashboardIcon from './DashboardIcon';
import FileShareIcon from './FileShareIcon';
import MailIcon from './MailIcon';
import ScheduleIcon from './ScheduleIcon';
import TransactionIcon from './TransactionIcon';
import VideoIcon from './VideoIcon';
import LogoutIcon from './LogoutIcon';
import PortraitIcon from './PortraitIcon';
import StatisticIcon from './StatisticIcon';
import CommunicationIcon from './CommunicationIcon';
import AddIcon from './AddIcon';
import FileShareSmallIcon from './FileShareSmallIcon';
import SharedIcon from './SharedIcon';
import HistoryIcon from './HistoryIcon';
import StarredIcon from './StarredIcon';
import CalendarIcon from './CalendarIcon';
import MailInboxIcon from './MailInboxIcon';
import MailStarredIcon from './MailStarredIcon';
import MailDraftIcon from './MailDraftIcon';
import MailTrashIcon from './MailTrashIcon';
import MailArchiveIcon from './MailArchiveIcon';
import MailSettingsIcon from './MailSettingsIcon';
import ChatIcon from './ChatIcon';
import GroupIcon from './GroupIcon';
import MediaStreamingIcon from './MediaStreamingIcon';
import TelephonyIcon from './TelephonyIcon';
import AddContactIcon from './AddContactIcon';

// return svg icon by icon name;

const SVG = ({ name }) => {
  switch (name) {
    case 'add':
      return <AddIcon />;
    case 'fileShareSmall':
      return <FileShareSmallIcon />;
    case 'shared':
      return <SharedIcon />;
    case 'history':
      return <HistoryIcon />;
    case 'starred':
      return <StarredIcon />;
    case 'calendar':
      return <CalendarIcon />;
    case 'mailInbox':
      return <MailInboxIcon />;
    case 'mailStarred':
      return <MailStarredIcon />;
    case 'mailDrafts':
      return <MailDraftIcon />;
    case 'mailTrash':
      return <MailTrashIcon />;
    case 'mailArchive':
      return <MailArchiveIcon />;
    case 'mailSettings':
      return <MailSettingsIcon />;
    case 'dashboard':
      return <DashboardIcon />;
    case 'fileShare':
      return <FileShareIcon />;
    case 'mail':
      return <MailIcon />;
    case 'schedule':
      return <ScheduleIcon />;
    case 'transaction':
      return <TransactionIcon />;
    case 'video':
      return <VideoIcon />;
    case 'logout':
      return <LogoutIcon />;
    case 'portrait':
      return <PortraitIcon />;
    case 'statistic':
      return <StatisticIcon />;
    case 'communication':
      return <CommunicationIcon />;
    case 'telephony':
      return <TelephonyIcon />;
    case 'mediaStreaming':
      return <MediaStreamingIcon />;
    case 'group':
      return <GroupIcon />;
    case 'chat':
      return <ChatIcon />;
    case 'addContact':
      return <AddContactIcon />;
    default:
      return '';
  }
};

export default SVG;
