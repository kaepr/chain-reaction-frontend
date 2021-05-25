import React from 'react';
import { useAtom } from 'jotai';
import { userData } from '../../store/store';

export const Dashboard = () => {
  const [user, setUser] = useAtom(userData);

  if (!user) {
    return <></>;
  }

  return (
    <div className="text-gray-700 mt-8 mx-auto max-w-sm flex flex-col text-center">
      <span className="font-bold text-4xl">Dashboard</span>
      <p>Hello {user.userData.username}</p>
    </div>
  );
};
