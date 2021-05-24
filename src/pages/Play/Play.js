import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { userData } from '../../store/store';
import { init } from './Socket';

export const Play = () => {
  const [user, setUser] = useAtom(userData);
  const [socketHandler, setSocketHandler] = useState(null);

  useEffect(() => {
    const socketClient = init();
    console.log('socket io client = ', socketClient);
    setSocketHandler(socketClient);

    return () => {
      socketClient.disconnect();
      setSocketHandler(null);
    };
  }, []);

  useEffect(() => {
    if (socketHandler !== null) {
      console.log('handler = ', socketHandler);

      socketHandler.on('connection', () => {
        console.log('sent connection request');
      });

      socketHandler.on('init', (data) => {
        console.log('data from socket server', data);
      });
    }
  }, [socketHandler]);

  return (
    <div className="mx-auto">
      Play
      {user.userData.username}
    </div>
  );
};
