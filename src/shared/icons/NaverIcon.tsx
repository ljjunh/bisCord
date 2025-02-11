import type IconTypes from '../model/types/IconType';

export const NaverIcon = ({ size = 24, color = '#03C75A' }: IconTypes) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_122_141)">
        <path
          d="M13.5614 10.7033L6.14609 0H0V20H6.43861V9.295L13.8539 20H20V0H13.5614V10.7033Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_122_141">
          <rect
            width="20"
            height="20"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
