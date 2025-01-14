import { UsersData } from '@/shared/mockData/userData';
import ListItem from '@/shared/ui/ListItem';
import ListContainer from '@/shared/ui/layout/ListContainer';

const DmList = () => {
  const users = UsersData;

  return (
    <ListContainer>
      <div className="flex flex-col gap-1 px-2">
        {users.map((user) => (
          <ListItem
            key={user.userId}
            user={user}
          />
        ))}
      </div>
    </ListContainer>
  );
};

export default DmList;
