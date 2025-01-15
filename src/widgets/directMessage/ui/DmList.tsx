import PlusIcon from '@/shared/icons/PlusIcon';
import { UsersData } from '@/shared/mockData/userData';
import ListItem from '@/shared/ui/ListItem';
import ListContainer from '@/shared/ui/layout/ListContainer';
import { NavLink } from 'react-router-dom';

const DmList = () => {
  const users = UsersData;

  return (
    <ListContainer>
      <div className="flex flex-col gap-1 px-2 text-light-gray">
        <div className="flex items-center justify-between px-2 py-1 hover:text-white">
          <div className="text-xs font-semibold">다이렉트 메세지</div>
          <PlusIcon
            size={10}
            color="#ffffff"
          />
        </div>
        {users.map((user) => (
          <NavLink
            to={`/directmessage/${user.userId}`}
            key={user.userId}
          >
            <ListItem user={user}></ListItem>
          </NavLink>
        ))}
      </div>
    </ListContainer>
  );
};

export default DmList;
