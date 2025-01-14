import IconTypes from "../../entities/types/IconType";

const PlusIcon = ({ size = 20, color = "#828391" }: IconTypes) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.6668 9.81496H12.1854V0.333496H9.81496V9.81496H0.333496V12.1854H9.81496V21.6668H12.1854V12.1854H21.6668V9.81496Z"
        fill={color}
      />
    </svg>
  );
};

export default PlusIcon;
