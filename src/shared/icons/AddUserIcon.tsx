import IconTypes from '../types/IconType';

export const AddUserIcon = ({ size = 20, color = '#828391' }: IconTypes) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.6667 16.1067C23.0203 16.1067 23.3594 16.2472 23.6095 16.4972C23.8595 16.7473 24 17.0864 24 17.44V21.44H28C28.3536 21.44 28.6928 21.5805 28.9428 21.8305C29.1929 22.0806 29.3333 22.4197 29.3333 22.7734C29.3333 23.127 29.1929 23.4661 28.9428 23.7162C28.6928 23.9662 28.3536 24.1067 28 24.1067H24V28.1067C24 28.4603 23.8595 28.7995 23.6095 29.0495C23.3594 29.2995 23.0203 29.44 22.6667 29.44C22.313 29.44 21.9739 29.2995 21.7239 29.0495C21.4738 28.7995 21.3333 28.4603 21.3333 28.1067V24.1067H17.3333C16.9797 24.1067 16.6406 23.9662 16.3905 23.7162C16.1405 23.4661 16 23.127 16 22.7734C16 22.4197 16.1405 22.0806 16.3905 21.8305C16.6406 21.5805 16.9797 21.44 17.3333 21.44H21.3333V17.44C21.3333 17.0864 21.4738 16.7473 21.7239 16.4972C21.9739 16.2472 22.313 16.1067 22.6667 16.1067ZM19.7707 14.68C20.116 14.3187 20.116 13.6854 19.668 13.46C17.8963 12.5676 15.9397 12.104 13.956 12.1067H12.7107C9.33959 12.1067 6.10658 13.4458 3.72287 15.8296C1.33916 18.2133 0 21.4463 0 24.8174C0 25.8974 0.876 26.7734 1.956 26.7734H2.24933C2.56933 26.7734 2.84267 26.5467 2.92133 26.236C3.276 24.852 3.944 23.5347 4.54933 22.5627C4.73467 22.2667 5.13333 22.4414 5.06533 22.784L4.42533 25.976C4.40601 26.0727 4.40837 26.1725 4.43224 26.2681C4.45612 26.3638 4.50092 26.453 4.56341 26.5292C4.62589 26.6055 4.70452 26.6669 4.79362 26.7092C4.88272 26.7514 4.98007 26.7733 5.07867 26.7734H15.772C16.132 26.7734 16.2707 26.2174 15.9653 26.0267C14.8067 25.3014 13.3333 24.1147 13.3333 22.7734C13.3333 21.7125 13.7548 20.6951 14.5049 19.9449C15.2551 19.1948 16.2725 18.7734 17.3333 18.7734H18C18.1768 18.7734 18.3464 18.7031 18.4714 18.5781C18.5964 18.4531 18.6667 18.2835 18.6667 18.1067V17.44C18.6667 16.3707 19.0867 15.4 19.7707 14.68ZM13.3333 10.7734C14.7478 10.7734 16.1044 10.2115 17.1046 9.21126C18.1048 8.21107 18.6667 6.85451 18.6667 5.44002C18.6667 4.02553 18.1048 2.66898 17.1046 1.66879C16.1044 0.668593 14.7478 0.106689 13.3333 0.106689C11.9188 0.106689 10.5623 0.668593 9.5621 1.66879C8.5619 2.66898 8 4.02553 8 5.44002C8 6.85451 8.5619 8.21107 9.5621 9.21126C10.5623 10.2115 11.9188 10.7734 13.3333 10.7734Z"
        fill={color}
      />
    </svg>
  );
};
