import IconTypes from '../types/IconType';

const SearchIcon = ({ size = 20, color = '#828391' }: IconTypes) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.3951 14.1619C24.3951 15.5635 24.119 16.9514 23.5826 18.2463C23.0463 19.5412 22.2601 20.7178 21.269 21.7089C20.2779 22.7 19.1013 23.4862 17.8064 24.0226C16.5114 24.5589 15.1236 24.835 13.7219 24.835C12.3203 24.835 10.9324 24.5589 9.63751 24.0226C8.34259 23.4862 7.16599 22.7 6.1749 21.7089C5.18381 20.7178 4.39763 19.5412 3.86126 18.2463C3.32488 16.9514 3.04881 15.5635 3.04881 14.1619C3.04881 11.3312 4.1733 8.61644 6.1749 6.61484C8.1765 4.61324 10.8913 3.48875 13.7219 3.48875C16.5526 3.48875 19.2674 4.61324 21.269 6.61484C23.2706 8.61644 24.3951 11.3312 24.3951 14.1619ZM22.2879 24.8838C19.5477 27.073 16.0733 28.1298 12.5782 27.8373C9.08311 27.5448 5.83268 25.9252 3.49446 23.311C1.15624 20.6969 -0.0922796 17.2866 0.00531954 13.7807C0.102919 10.2747 1.53923 6.93924 4.01926 4.4592C6.49929 1.97917 9.8348 0.54286 13.3407 0.445261C16.8467 0.347662 20.2569 1.59618 22.8711 3.9344C25.4853 6.27262 27.1049 9.52305 27.3974 13.0181C27.6899 16.5132 26.633 19.9876 24.4439 22.7278L31.572 29.856C31.8497 30.1435 32.0034 30.5287 31.9999 30.9285C31.9965 31.3282 31.8361 31.7107 31.5534 31.9934C31.2707 32.2761 30.8883 32.4364 30.4885 32.4399C30.0887 32.4434 29.7036 32.2897 29.416 32.0119L22.2879 24.8838Z"
        fill={color}
      />
    </svg>
  );
};

export default SearchIcon;
