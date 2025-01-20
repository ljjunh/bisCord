import IconTypes from '../types/IconType';

export const CheckIcon = ({ width = 16, height = 12, color = '#828391' }: IconTypes) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.99972 14.5602L2.43972 9.00024L0.546387 10.8802L7.99972 18.3336L23.9997 2.33361L22.1197 0.453613L7.99972 14.5602Z"
        fill={color}
      />
    </svg>
  );
};
