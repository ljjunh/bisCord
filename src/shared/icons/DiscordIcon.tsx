import type IconTypes from '../model/types/IconType';

export const DiscordIcon = ({ size = 20, color = '#828391' }: IconTypes) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 27 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.9996 2.56968C21.3061 1.77731 19.4952 1.20141 17.602 0.873535C17.3694 1.29389 17.0978 1.85928 16.9105 2.30906C14.898 2.0064 12.904 2.0064 10.9285 2.30906C10.7412 1.85928 10.4634 1.29389 10.2288 0.873535C8.33354 1.20141 6.5206 1.77941 4.82701 2.57388C1.41103 7.73589 0.485007 12.7697 0.948017 17.732C3.21368 19.424 5.40938 20.4517 7.56803 21.1243C8.10101 20.3908 8.57637 19.611 8.98587 18.7892C8.20596 18.4929 7.45897 18.1271 6.75314 17.7026C6.9404 17.5639 7.12354 17.4188 7.30052 17.2696C11.6055 19.2831 16.2829 19.2831 20.5364 17.2696C20.7155 17.4188 20.8986 17.5639 21.0838 17.7026C20.3759 18.1292 19.6269 18.495 18.847 18.7913C19.2565 19.611 19.7298 20.3929 20.2648 21.1264C22.4255 20.4538 24.6233 19.4261 26.8889 17.732C27.4322 11.9794 25.9609 6.99185 22.9996 2.56968ZM9.57235 14.6802C8.28004 14.6802 7.22026 13.4738 7.22026 12.0046C7.22026 10.5355 8.2574 9.32694 9.57235 9.32694C10.8873 9.32694 11.9471 10.5334 11.9244 12.0046C11.9265 13.4738 10.8873 14.6802 9.57235 14.6802ZM18.2646 14.6802C16.9723 14.6802 15.9125 13.4738 15.9125 12.0046C15.9125 10.5355 16.9496 9.32694 18.2646 9.32694C19.5795 9.32694 20.6393 10.5334 20.6167 12.0046C20.6167 13.4738 19.5795 14.6802 18.2646 14.6802Z"
        fill={color}
      />
    </svg>
  );
};
