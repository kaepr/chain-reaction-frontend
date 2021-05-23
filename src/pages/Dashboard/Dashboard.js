import React from 'react';
import { useRecoilValue } from 'recoil';
import { userData } from '../../store/store';

export const Dashboard = () => {
  const user = useRecoilValue(userData);
  return (
    <div>
      Dashboard
      {user.username}
    </div>
  );
};
