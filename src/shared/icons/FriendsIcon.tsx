import type IconTypes from '../model/types/IconType';

export const FriendsIcon = ({ size = 24, color = '#9597A3' }: IconTypes) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 33"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.3333 13.3333C18.7478 13.3333 20.1044 12.7714 21.1046 11.7712C22.1048 10.771 22.6667 9.41445 22.6667 7.99996C22.6667 6.58547 22.1048 5.22892 21.1046 4.22872C20.1044 3.22853 18.7478 2.66663 17.3333 2.66663C15.9188 2.66663 14.5623 3.22853 13.5621 4.22872C12.5619 5.22892 12 6.58547 12 7.99996C12 9.41445 12.5619 10.771 13.5621 11.7712C14.5623 12.7714 15.9188 13.3333 17.3333 13.3333Z"
        fill={color}
      />
      <path
        d="M4 6.66667V5.66667C4 4.74667 4.74667 4 5.66667 4C6.58667 4 7.32 4.74667 7.44 5.66667C8.16 11.5333 12.6133 16 17.3333 16H18.6667C21.4956 16 24.2088 17.1238 26.2091 19.1242C28.2095 21.1246 29.3333 23.8377 29.3333 26.6667C29.3333 27.3739 29.0524 28.0522 28.5523 28.5523C28.0522 29.0524 27.3739 29.3333 26.6667 29.3333C26.6067 29.333 26.5483 29.3133 26.5003 29.2773C26.4523 29.2413 26.4171 29.1908 26.4 29.1333C25.9963 28.0164 25.4007 26.9786 24.64 26.0667C24.44 25.8 24.08 25.9867 24.12 26.2933L24.4533 28.96C24.48 29.16 24.32 29.3333 24.12 29.3333H12C11.2928 29.3333 10.6145 29.0524 10.1144 28.5523C9.61428 28.0522 9.33333 27.3739 9.33333 26.6667V23.7067C9.33333 21.6133 8.44 19.64 7.29333 17.88C5.16332 14.5261 4.02189 10.6397 4 6.66667Z"
        fill={color}
      />
    </svg>
  );
};
