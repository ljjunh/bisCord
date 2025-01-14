interface IUserProps {
  user: {
    userId: number;
    userName: string;
    userState: boolean;
  };
}

const ListItem = ({ user }: IUserProps) => {
  return (
    <div className="flex gap-2 rounded-md p-2 text-light-gray hover:bg-gray hover:text-white">
      {user.userName}
    </div>
  );
};

export default ListItem;
