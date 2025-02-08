import type IconTypes from '../types/IconType';

export const UnMuteIcon = ({ size = 32, color = '#F23F43' }: IconTypes) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.6002 30.2666L30.2669 3.59989C30.4594 3.34312 30.5529 3.02551 30.5302 2.70537C30.5074 2.38522 30.37 2.08403 30.143 1.85708C29.9161 1.63013 29.6149 1.49266 29.2947 1.46991C28.9746 1.44716 28.657 1.54065 28.4002 1.73322L1.73353 28.3999C1.58071 28.5145 1.45429 28.6606 1.36286 28.8283C1.27142 28.9961 1.21709 29.1815 1.20355 29.372C1.19001 29.5626 1.21757 29.7538 1.28437 29.9328C1.35117 30.1118 1.45564 30.2743 1.59072 30.4094C1.7258 30.5444 1.88832 30.6489 2.06729 30.7157C2.24626 30.7825 2.4375 30.8101 2.62805 30.7965C2.8186 30.783 3.00401 30.7287 3.17174 30.6372C3.33946 30.5458 3.48558 30.4194 3.6002 30.2666ZM14.4002 23.0932C14.1202 23.3732 14.2669 23.8666 14.6669 23.9199V26.6666H12.0002C11.6466 26.6666 11.3074 26.807 11.0574 27.0571C10.8073 27.3071 10.6669 27.6463 10.6669 27.9999C10.6669 28.3535 10.8073 28.6926 11.0574 28.9427C11.3074 29.1927 11.6466 29.3332 12.0002 29.3332H20.0002C20.3538 29.3332 20.693 29.1927 20.943 28.9427C21.1931 28.6926 21.3335 28.3535 21.3335 27.9999C21.3335 27.6463 21.1931 27.3071 20.943 27.0571C20.693 26.807 20.3538 26.6666 20.0002 26.6666H17.3335V23.9199C19.9118 23.5951 22.2829 22.3402 24.0014 20.3908C25.7199 18.4415 26.6678 15.9319 26.6669 13.3332C26.6669 12.9796 26.5264 12.6405 26.2763 12.3904C26.0263 12.1404 25.6871 11.9999 25.3335 11.9999C24.9799 11.9999 24.6408 12.1404 24.3907 12.3904C24.1407 12.6405 24.0002 12.9796 24.0002 13.3332C24.0002 15.2666 23.3069 17.0532 22.1602 18.4399L22.1335 18.4666C21.4307 19.3113 20.5611 20.0018 19.5792 20.4951C18.5973 20.9884 17.5241 21.2737 16.4269 21.3332C16.2563 21.3418 16.0948 21.413 15.9735 21.5332L14.4002 23.1066V23.0932ZM20.4802 6.02655C20.6802 5.82655 20.7335 5.51989 20.5869 5.27989C19.9906 4.275 19.0808 3.49374 17.9974 3.05618C16.9139 2.61863 15.7168 2.54899 14.5899 2.85797C13.463 3.16695 12.4688 3.83745 11.76 4.76642C11.0513 5.69539 10.6672 6.83142 10.6669 7.99989V13.3332C10.6669 13.7332 10.7069 14.1066 10.8002 14.4799C10.8935 14.9332 11.4535 15.0532 11.7869 14.7199L20.4802 6.02655ZM6.74686 18.6399C6.96019 19.0132 7.45353 19.0532 7.74686 18.7599L8.74686 17.7599C8.96019 17.5466 9.00019 17.2266 8.85353 16.9466C8.28824 15.8262 7.99585 14.5881 8.00019 13.3332C8.00019 12.9796 7.85972 12.6405 7.60967 12.3904C7.35962 12.1404 7.02048 11.9999 6.66686 11.9999C6.31324 11.9999 5.9741 12.1404 5.72405 12.3904C5.474 12.6405 5.33353 12.9796 5.33353 13.3332C5.33353 15.2666 5.85353 17.0799 6.74686 18.6399Z"
        fill={color}
      />
    </svg>
  );
};
