import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { injectIntl } from 'react-intl';

import Counter from '../../../components/Counter';
import SVG from '../../../components/Icons/SVG';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function renderTooltip(props) {
  return (
    <Tooltip id="button-tooltip" {...props}>
      {props.label}
    </Tooltip>
  );
}

const Navigator = (props) => {
  const {
    intl: { formatMessage },
  } = props;

  return (
    <ul className="navigator">
      {props.navItems.map((item, index) => (
        <li key={`nav_${item.id}`}>
          <NavLink
            to={`${process.env.PUBLIC_URL}${item.to}`}
            onClick={(e) => {
              props.setActiveNav(index);
            }}
          >
            <OverlayTrigger
              placement="right"
              delay={{ show: 150, hide: 400 }}
              overlay={renderTooltip({
                label: formatMessage(item.label),
                style: { fontSize: '14px' },
              })}
            >
              <div
                className={classNames(
                  'nav-item',
                  'with-counter',
                  'sidebar-icon',
                  {
                    active: index === props.activeNav,
                  }
                )}
              >
                <SVG name={item.icon} />
                <Counter count={item.notification} />
              </div>
            </OverlayTrigger>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

Navigator.propTypes = {
  activeNav: PropTypes.number.isRequired,
  navItems: PropTypes.array.isRequired,
  setActiveNav: PropTypes.func,
};

export default injectIntl(Navigator);
