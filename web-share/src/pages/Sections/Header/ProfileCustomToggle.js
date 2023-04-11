import React from 'react';

const ProfileCustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href="/"
    ref={ref}
    className="profile-dropdown"
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <span>&#x25bc;</span>
  </a>
));

export default ProfileCustomToggle;
