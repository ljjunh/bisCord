import IconTypes from '../types/IconType';

export const KakaoIcon = ({ size = 26, color = 'black' }: IconTypes) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0001 0.666687C4.47688 0.666687 0 4.12554 0 8.39148C0 11.0445 1.73157 13.3834 4.36838 14.7745L3.25893 18.8273C3.16091 19.1854 3.57047 19.4709 3.88498 19.2633L8.74819 16.0536C9.1586 16.0932 9.57568 16.1164 10.0001 16.1164C15.5228 16.1164 20 12.6576 20 8.39148C20 4.12554 15.5228 0.666687 10.0001 0.666687"
        fill={color}
      />
    </svg>
  );
};
