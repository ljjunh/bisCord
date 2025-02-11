import type IconTypes from '../model/types/IconType';

export const ArrowRight = ({ size = 20, color = '#828391' }: IconTypes) => {
  return (
    <svg
      width={size * 0.7}
      height={size}
      viewBox="0 0 16 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.666504 2.82L9.73167 12L0.666504 21.18L3.45732 24L15.3331 12L3.45732 0L0.666504 2.82Z"
        fill={color}
      />
    </svg>
  );
};
