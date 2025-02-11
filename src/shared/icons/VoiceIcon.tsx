import type IconTypes from '../model/types/IconType';

export const VoiceIcon = ({ size = 20, color = '#828391' }: IconTypes) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.9998 1.43981C13.9998 1.08619 13.8594 0.747048 13.6093 0.497C13.3593 0.246952 13.0201 0.106476 12.6665 0.106476H12.5865C12.4014 0.105224 12.2181 0.142513 12.0483 0.215969C11.8784 0.289426 11.7257 0.397442 11.5998 0.533142L5.89317 6.77314H1.99984C1.64622 6.77314 1.30708 6.91362 1.05703 7.16367C0.80698 7.41371 0.666504 7.75285 0.666504 8.10647V18.7731C0.666504 19.1268 0.80698 19.4659 1.05703 19.716C1.30708 19.966 1.64622 20.1065 1.99984 20.1065H5.89317L11.5998 26.3465C11.7257 26.4822 11.8784 26.5902 12.0483 26.6636C12.2181 26.7371 12.4014 26.7744 12.5865 26.7731H12.6665C13.0201 26.7731 13.3593 26.6327 13.6093 26.3826C13.8594 26.1326 13.9998 25.7934 13.9998 25.4398V1.43981ZM18.1332 25.1065C17.3598 25.2931 16.6665 24.6665 16.6665 23.8798V23.8398C16.6665 23.1731 17.1598 22.6131 17.7998 22.4398C19.7714 21.8983 21.5106 20.7243 22.7502 19.0984C23.9897 17.4724 24.6611 15.4844 24.6611 13.4398C24.6611 11.3952 23.9897 9.40722 22.7502 7.78125C21.5106 6.15529 19.7714 4.98134 17.7998 4.43981C17.4832 4.36364 17.2006 4.18518 16.9957 3.93207C16.7908 3.67896 16.6751 3.36534 16.6665 3.03981V2.99981C16.6665 2.19981 17.3598 1.58648 18.1332 1.77314C20.7525 2.40373 23.0834 3.89739 24.7506 6.01366C26.4179 8.12993 27.3245 10.7457 27.3245 13.4398C27.3245 16.1339 26.4179 18.7497 24.7506 20.866C23.0834 22.9822 20.7525 24.4759 18.1332 25.1065Z"
        fill={color}
      />
      <path
        d="M18.2132 19.4532C17.4532 19.8266 16.6665 19.1866 16.6665 18.3466V18.1599C16.6665 17.5866 17.0398 17.0932 17.5065 16.7999C18.0679 16.4373 18.5295 15.9398 18.8491 15.3528C19.1687 14.7659 19.3362 14.1082 19.3362 13.4399C19.3362 12.7716 19.1687 12.1139 18.8491 11.527C18.5295 10.94 18.0679 10.4425 17.5065 10.0799C17.0398 9.77322 16.6665 9.27989 16.6665 8.71989V8.53322C16.6665 7.69322 17.4532 7.06655 18.2132 7.42655C19.3475 7.96951 20.3052 8.82224 20.9755 9.88629C21.6459 10.9503 22.0016 12.1823 22.0016 13.4399C22.0016 14.6975 21.6459 15.9294 20.9755 16.9935C20.3052 18.0575 19.3475 18.9103 18.2132 19.4532Z"
        fill={color}
      />
    </svg>
  );
};
