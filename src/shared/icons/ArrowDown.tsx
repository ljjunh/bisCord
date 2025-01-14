import IconTypes from "../../entities/types/IconType";

const ArrowDown = ({ size = 20, color = "#828391" }: IconTypes) => {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 16 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.12 0.453613L8 6.56024L1.88 0.453613L0 2.33357L8 10.3336L16 2.33357L14.12 0.453613Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowDown;
