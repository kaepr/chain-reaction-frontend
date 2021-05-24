import React from 'react';
import { useAtom } from 'jotai';
import { userData } from '../../store/store';

export const Dashboard = () => {
  const [user, setUser] = useAtom(userData);

  return (
    <div>
      Dashboard
      {user.userData.username}
    </div>
  );
};
