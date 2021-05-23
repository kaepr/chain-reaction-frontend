import React from 'react';
import { useAtom } from 'jotai';
import { userData } from '../../store/store';

export const Play = () => {
  const [user, setUser] = useAtom(userData);
  return (
    <div className="mx-auto">
      Play
      {user.username}
    </div>
  );
};
