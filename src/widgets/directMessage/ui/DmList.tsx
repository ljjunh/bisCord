import { UsersData } from '@/shared/mockData/userData';
import ListItem from '@/shared/ui/ListItem';
import ListContainer from '@/shared/ui/layout/ListContainer';
import { NavLink } from 'react-router-dom';

const DmList = () => {
  const users = UsersData;

  return (
    <ListContainer>
      <div className="flex flex-col gap-1 px-2">
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
