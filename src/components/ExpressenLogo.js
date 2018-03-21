import React from "react";

const ExpressenLogo = props => (
  <svg
    viewBox="0 0 512 512"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <defs>
      <path id="a" d="M0 2.066h322.321V375H0V2.066z" />
    </defs>
    <g transform="translate(94 69)" fill="none" fillRule="evenodd">
      <mask id="b" fill="#fff">
        <use xlinkHref="#a" />
      </mask>
      <path
        d="M175.14 182.627h52.48c14.834 0 29.102-3.38 30.242-24.754l3.993-21.938h12.55L257.862 243.37h-10.267l3.42-23.621c2.284-14.063-8.557-24.746-21.11-24.746h-54.769l-23.382 167.617h78.15c15.404-3.375 39.364-17.996 52.484-89.434h12.55l-14.26 101.817H.001l3.423-12.375h16.544c14.264 0 21.107-9.004 21.107-12.383l45.64-321.739c0-12.375-7.416-12.375-37.65-12.375l1.698-14.062h271.56L311.49 76.873h-12.55V66.755c0-21.94-1.71-50.625-22.821-50.625h-77.018l-23.96 166.497z"
        fill="#E30613"
        mask="url(#b)"
      />
    </g>
  </svg>
);

export default ExpressenLogo;
