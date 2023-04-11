import React, { useState, useEffect } from 'react';

import Navigator from './Navigator';
import SubMenu from './SubMenu';

import navItems from './navItems';

const Sidebar = (props) => {
  const [activeNav, setActiveNav] = useState(0);
  const [activeMenu, setActiveMenu] = useState(0);

  useEffect(() => {
    const path = props.location.pathname;
    const navItemIndex = navItems.findIndex((item) => path.includes(item.to));
    if (navItemIndex >= 0) {
      setActiveNav(navItemIndex);
    } else {
      setActiveNav(0);
    }
  }, [props.location.pathname]);

  return (
    <div className="sidebar">
      <Navigator
        navItems={navItems}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />
      <SubMenu
        menuItems={navItems[activeNav].menuItems}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        btnLabel={navItems[activeNav].btnLabel}
        filterItems={navItems[activeNav].filterItems}
        hasCount={navItems[activeNav].hasCount ? true : false}
        path={props.location.pathname}
      />
    </div>
  );
};

export default Sidebar;
