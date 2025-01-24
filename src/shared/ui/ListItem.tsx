import UserAvatar from './UserAvatar';

interface IUserProps {
  user: {
    userImage?: string;
    userId?: number;
    userName?: string;
    userState?: boolean;
  };
}

const ListItem = ({ user }: IUserProps) => {
  return (
    <div className="flex items-center gap-2 rounded-md px-2 py-1 text-light-gray hover:bg-gray hover:text-white">
      {user.userImage ? (
        <></>
      ) : (
        <UserAvatar
          size={20}
          image={user.userImage}
        ></UserAvatar>
      )}
      {user.userName}
    </div>
  );
};

export default ListItem;
