import React from 'react';

import Header from '../Header';
import Sidebar from '../Sidebar';

const Layout = (props) => {
  return (
    <div>
      <Header />
      <div className="main">
        <Sidebar {...props} />
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;