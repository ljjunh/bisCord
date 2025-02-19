import type IconTypes from '../../model/types/IconType';

export const MessageIcon = ({ size = 18, color = '#C7C8CE' }: IconTypes) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.9504 31.2061C25.4465 31.2061 32.3335 24.3191 32.3335 15.823C32.3335 7.32694 25.4465 0.439941 16.9504 0.439941C8.45437 0.439941 1.56737 7.32694 1.56737 15.823C1.56737 18.8535 2.44421 21.6809 3.9579 24.0637C4.05128 24.2074 4.09574 24.3775 4.08466 24.5485C4.07357 24.7195 4.00753 24.8824 3.89637 25.0128L0.716691 28.6571C-0.152452 29.6508 0.552093 31.2061 1.87504 31.2061H16.9504Z"
        fill={color}
      />
    </svg>
  );
};
