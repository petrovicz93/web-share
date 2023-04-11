import React from 'react';
import PropTypes from 'prop-types';

const Counter = (props) =>
  props.count ? <span className="counter">{props.count}</span> : '';

Counter.propTypes = {
  count: PropTypes.number,
};

export default Counter;
