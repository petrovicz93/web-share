import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import SVG from '../../../components/Icons/SVG';
import CreateNewFile from '../../FileShare/CreateFile';
import CreateGroup from '../../Group/CreateGroup';

const SubMenu = (props) => {
  const [showNewFileModal, setShowNewFileModal] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  useEffect(() => {
    const path = props.path;
    const navItemIndex = props.menuItems.findIndex((item) =>
      path.includes(item.to)
    );
    if (navItemIndex >= 0) {
      props.setActiveMenu(navItemIndex);
    }
  }, [props]);

  const newButton = (btnLabel) => {
    if (btnLabel === 'Create New') {
      setShowNewFileModal(true);
    } else if (btnLabel === 'Create New Group') {
      setShowCreateGroupModal(true);
    }
  };

  return props.menuItems.length > 0 ? (
    <div className="sub-menu">
      <div className="item-list">
        <div className="d-flex justify-content-center">
          <Button className="btn" onClick={() => newButton(props.btnLabel)}>
            {props.btnLabel}
          </Button>
          <CreateNewFile
            show={showNewFileModal}
            close={() => setShowNewFileModal(false)}
          ></CreateNewFile>
          <CreateGroup
            show={showCreateGroupModal}
            close={() => setShowCreateGroupModal(false)}
          ></CreateGroup>
        </div>
        <ul>
          {props.menuItems.map((item, index) => (
            <li
              className={classNames({ active: props.activeMenu === index })}
              key={`submenu_${item.id}`}
              onClick={(e) => {
                props.setActiveMenu(index);
              }}
            >
              <div className="row">
                <div className="col-2">
                  <SVG name={item.icon} />
                </div>
                <div
                  className={classNames('label', {
                    [`col-8`]: props.hasCount,
                    [`col-10`]: !props.hasCount,
                  })}
                >
                  {item.external ? (
                    <a
                      href={`${item.to}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link to={`${process.env.PUBLIC_URL}${item.to}`}>
                      {item.label}
                    </Link>
                  )}
                </div>
                {item.count ? (
                  <div className="col-2">
                    <div
                      className="count"
                      style={{ backgroundColor: `${item.color}` }}
                    >
                      {item.count}
                    </div>
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {props.filterItems && props.filterItems.length > 0 && (
        <hr className="sub-menu-divider" />
      )}
      <div className="item-list">
        <ul>
          {props.filterItems &&
            props.filterItems.map((item, index) => (
              <li key={`submenu_${item.id}`}>
                <div className="row">
                  <div className="col-3">
                    <div
                      className="group-filter"
                      style={{ borderColor: item.color }}
                    />
                  </div>
                  <div className="col-6">{item.label}</div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  ) : null;
};

SubMenu.propTypes = {
  activeMenu: PropTypes.number.isRequired,
  btnLabel: PropTypes.string,
  menuItems: PropTypes.array.isRequired,
  filterItems: PropTypes.array,
  setActiveMenu: PropTypes.func,
  hasCount: PropTypes.bool,
};

export default SubMenu;
