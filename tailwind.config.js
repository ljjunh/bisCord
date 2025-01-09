/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: "	#7289da",
      blue: "#5865f2",
      black: "#1e2124", // 제일 어두운 검정 배경 색
      gray: "#424549", // 기본 hover되었을 때 또는 가장 밝은 배경 및 폰트에 적용
      white: "#fdfdfd", // 흰 글씨
      red: "#da373c", // error 및 삭제, red에 적용
      green: "#23A55A", // 연결상태 true 또는 online등 색상
      "mid-gray": "#36393e", // 세번째로 어두운 배경 색
      "dark-gray": "#282b30", // 두번째로 어두운 배경 색
    },
  },
  plugins: [],
};
