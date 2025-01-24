import IconTypes from '../types/IconType';

const CloseIcon = ({ size = 20, color = '#828391' }: IconTypes) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.5335 0.893311L11.0002 9.42664L2.46683 0.893311L0.333496 3.02664L8.86683 11.56L0.333496 20.0933L2.46683 22.2266L11.0002 13.6933L19.5335 22.2266L21.6668 20.0933L13.1335 11.56L21.6668 3.02664L19.5335 0.893311Z"
        fill={color}
      />
    </svg>
  );
};

export default CloseIcon;
