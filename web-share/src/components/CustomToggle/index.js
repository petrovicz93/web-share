import React from 'react';

const CustomToggle = React.forwardRef(({ children, onClick, classes }, ref) => (
  <a
    href="/"
    ref={ref}
    className={classes}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </a>
));

export default CustomToggle;
