import React, { useContext } from 'react';
import { GameContext } from '../../../contexts/GameContext';

const WaitRoomScreen = () => {
  const { gameState } = useContext(GameContext);

  return (
    <>
      <div className="mt-4 flex flex-col content-center justify-center text-center">
        <p className="text-lg">{gameState.roomNumber}</p>
        <p className="text-lg">Send this code to your friend</p>
      </div>
    </>
  );
};

export default WaitRoomScreen;
