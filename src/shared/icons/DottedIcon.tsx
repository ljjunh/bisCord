import IconTypes from '../types/IconType';

const DottedIcon = ({ size = 20, color = '#828391' }: IconTypes) => {
  return (
    <svg
      width={size}
      height={size / 5}
      viewBox="0 0 32 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.90909 6.43994C3.68063 6.43994 4.42057 6.12387 4.96613 5.56126C5.51169 4.99865 5.81818 4.23559 5.81818 3.43994C5.81818 2.64429 5.51169 1.88123 4.96613 1.31862C4.42057 0.756012 3.68063 0.439941 2.90909 0.439941C2.13755 0.439941 1.39761 0.756012 0.852053 1.31862C0.306493 1.88123 0 2.64429 0 3.43994C0 4.23559 0.306493 4.99865 0.852053 5.56126C1.39761 6.12387 2.13755 6.43994 2.90909 6.43994ZM18.9091 3.43994C18.9091 4.23559 18.6026 4.99865 18.057 5.56126C17.5115 6.12387 16.7715 6.43994 16 6.43994C15.2285 6.43994 14.4885 6.12387 13.943 5.56126C13.3974 4.99865 13.0909 4.23559 13.0909 3.43994C13.0909 2.64429 13.3974 1.88123 13.943 1.31862C14.4885 0.756012 15.2285 0.439941 16 0.439941C16.7715 0.439941 17.5115 0.756012 18.057 1.31862C18.6026 1.88123 18.9091 2.64429 18.9091 3.43994ZM32 3.43994C32 4.23559 31.6935 4.99865 31.1479 5.56126C30.6024 6.12387 29.8624 6.43994 29.0909 6.43994C28.3194 6.43994 27.5794 6.12387 27.0339 5.56126C26.4883 4.99865 26.1818 4.23559 26.1818 3.43994C26.1818 2.64429 26.4883 1.88123 27.0339 1.31862C27.5794 0.756012 28.3194 0.439941 29.0909 0.439941C29.8624 0.439941 30.6024 0.756012 31.1479 1.31862C31.6935 1.88123 32 2.64429 32 3.43994Z"
        fill={color}
      />
    </svg>
  );
};

export default DottedIcon;
