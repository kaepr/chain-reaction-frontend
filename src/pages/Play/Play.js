import React from 'react';
import { useRecoilValue } from 'recoil';
import { userData } from '../../store/store';

export const Play = () => {
  const user = useRecoilValue(userData);
  return (
    <div className="mx-auto">
      Play
      {user.username}
    </div>
  );
};
