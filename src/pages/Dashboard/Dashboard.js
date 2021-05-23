import React from 'react';
import { useAtom } from 'jotai';
import { userData } from '../../store/store';

export const Dashboard = () => {
  const [user, setUser] = useAtom(userData);

  console.log('user in dashboard = ', user);

  return (
    <div>
      Dashboard
      {user.userData.username}
    </div>
  );
};
