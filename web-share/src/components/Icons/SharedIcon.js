import React from 'react';

const SharedIcon = (props) => {
  const width = props.width || '27.944';
  const height = props.height || '19.723';
  const className = props.className || '';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 27.944 19.723"
    >
      <g id="Group_18" data-name="Group 18" transform="translate(-130 -810)">
        <circle
          id="Ellipse_2"
          data-name="Ellipse 2"
          cx="5"
          cy="5"
          r="5"
          transform="translate(133 811)"
        />
        <path
          id="Path_31"
          data-name="Path 31"
          d="M7.738,0c4.279,0,6.967,1.662,7.748,4.579s.882,4.579-7.748,4.579S-.011,7.107-.011,4.579,3.458,0,7.738,0Z"
          transform="translate(130.715 820.566)"
        />
        <path
          id="Path_32"
          data-name="Path 32"
          d="M23.638,26.277a5.635,5.635,0,1,0-6.371,0A7.756,7.756,0,0,0,12,33.61v1.409a.7.7,0,0,0,.7.7H28.2a.7.7,0,0,0,.7-.7V33.61A7.756,7.756,0,0,0,23.638,26.277Zm-7.412-4.641a4.226,4.226,0,1,1,4.226,4.226A4.231,4.231,0,0,1,16.226,21.635ZM27.5,34.314H13.409v-.7a6.346,6.346,0,0,1,6.34-6.34h1.409a6.346,6.346,0,0,1,6.34,6.34Z"
          transform="translate(118 794)"
        />
        <path
          id="Path_33"
          data-name="Path 33"
          d="M22.509,25.279a5.088,5.088,0,1,0-5.752,0A7,7,0,0,0,12,31.9v1.272a.635.635,0,0,0,.636.636H26.629a.635.635,0,0,0,.636-.636V31.9A7,7,0,0,0,22.509,25.279Zm-6.692-4.191A3.816,3.816,0,1,1,19.633,24.9,3.82,3.82,0,0,1,15.816,21.088ZM25.993,32.537H13.272V31.9A5.731,5.731,0,0,1,19,26.177h1.272A5.731,5.731,0,0,1,25.993,31.9Z"
          transform="translate(130.679 795.914)"
        />
      </g>
    </svg>
  );
};

export default SharedIcon;
