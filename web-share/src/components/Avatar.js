import React from 'react';
import PropTypes from 'prop-types';

const avatarColors = [
  '#49F2CA',
  '#E36CDC',
  '#00B3FF',
  '#FF977C',
  '#87F8A9',
  '#00DCF9',
];

const Avatar = (props) => {
  const c = props.name.charAt(0);

  return props.src && props.src !== '' ? (
    <img className={props.className} src={props.src} alt={props.alt} />
  ) : (
    <div
      className={props.className}
      style={{ backgroundColor: avatarColors[(props.uuid%avatarColors.length)] }}
    >
      {c}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  alt: PropTypes.string,
  className: PropTypes.string,
  uuid: PropTypes.number,
  name: PropTypes.string,
};

export default Avatar;
