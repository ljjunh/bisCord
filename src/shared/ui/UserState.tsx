interface IUserStateProps {
  state?: boolean;
}

/** User Profile 상태 아이콘 입니다. props로 state값 boolean */
const UserState = ({ state }: IUserStateProps) => {
  return (
    <div className="absolute bottom-0 right-0 flex aspect-[1/1] w-[35%] items-center justify-center overflow-hidden rounded-[50%] bg-black">
      {state ? (
        <div className="aspect-[1/1] w-[60%] rounded-[50%] bg-green"></div>
      ) : (
        <div className="flex aspect-[1/1] w-[60%] rounded-[50%] bg-light-gray">
          <div className="m-auto aspect-[1/1] w-[50%] rounded-[50%] bg-black"></div>
        </div>
      )}
    </div>
  );
};

export default UserState;
