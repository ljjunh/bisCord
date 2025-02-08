import type IconTypes from '../types/IconType';

export const CallIcon = ({ width = 28, height = 27, color = '#C7C8CE' }: IconTypes) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.6665 10.3064C2.6665 8.39689 3.42507 6.56554 4.77533 5.21528C6.1256 3.86501 7.95694 3.10645 9.8665 3.10645C10.3465 3.10645 10.7998 3.39978 10.9732 3.83978L13.5465 10.0264C13.6701 10.3264 13.68 10.6612 13.5745 10.968C13.469 11.2748 13.2552 11.5326 12.9732 11.6931L9.33317 13.7731C9.723 16.1071 10.832 18.2611 12.5052 19.9344C14.1785 21.6076 16.3325 22.7166 18.6665 23.1064L20.1598 20.1198C20.3007 19.8367 20.5376 19.6129 20.8283 19.4883C21.1189 19.3638 21.4443 19.3466 21.7465 19.4398L28.4932 21.5198C28.9998 21.6664 29.3332 22.1331 29.3332 22.6531C29.3332 26.5731 26.1332 29.7731 22.2132 29.7731H21.7198C11.1865 29.7731 2.6665 21.2398 2.6665 10.7198V10.3064ZM17.3332 4.43978C17.3332 4.08616 17.4736 3.74702 17.7237 3.49697C17.9737 3.24692 18.3129 3.10645 18.6665 3.10645C21.4955 3.10645 24.2086 4.23025 26.209 6.23064C28.2094 8.23103 29.3332 10.9441 29.3332 13.7731C29.3332 14.1267 29.1927 14.4659 28.9426 14.7159C28.6926 14.966 28.3535 15.1064 27.9998 15.1064C27.6462 15.1064 27.3071 14.966 27.057 14.7159C26.807 14.4659 26.6665 14.1267 26.6665 13.7731C26.6665 11.6514 25.8236 9.61655 24.3234 8.11626C22.8231 6.61597 20.7882 5.77311 18.6665 5.77311C18.3129 5.77311 17.9737 5.63264 17.7237 5.38259C17.4736 5.13254 17.3332 4.7934 17.3332 4.43978Z"
        fill={color}
      />
      <path
        d="M17.3335 9.77327C17.3335 9.41965 17.474 9.08051 17.724 8.83047C17.9741 8.58042 18.3132 8.43994 18.6668 8.43994C20.0813 8.43994 21.4379 9.00184 22.4381 10.002C23.4383 11.0022 24.0002 12.3588 24.0002 13.7733C24.0002 14.1269 23.8597 14.466 23.6096 14.7161C23.3596 14.9661 23.0205 15.1066 22.6668 15.1066C22.3132 15.1066 21.9741 14.9661 21.724 14.7161C21.474 14.466 21.3335 14.1269 21.3335 13.7733C21.3335 13.066 21.0525 12.3878 20.5524 11.8877C20.0523 11.3876 19.3741 11.1066 18.6668 11.1066C18.3132 11.1066 17.9741 10.9661 17.724 10.7161C17.474 10.466 17.3335 10.1269 17.3335 9.77327Z"
        fill={color}
      />
    </svg>
  );
};
