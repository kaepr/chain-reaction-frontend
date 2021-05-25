import React, { useEffect, useState, useReducer, useContext } from 'react';
import { useAtom } from 'jotai';
import { userData } from '../../store/store';
import { init } from './Socket';
import { GameContext } from '../../contexts/GameContext';
import ACTIONS from '../../types/gameTypes';
import CreateScreen from './components/CreateScreen';

export const Play = () => {
  const [user, setUser] = useAtom(userData);
  const [socketHandler, setSocketHandler] = useState(null);
  const { game, dispatch } = useContext(GameContext);

  useEffect(() => {
    const socketClient = init();
    console.log('socket io client = ', socketClient);
    setSocketHandler(socketClient);

    return () => {
      socketClient.emit('LEFT_ROOM');
      socketClient.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socketHandler !== null) {
      console.log('user data', user);
      console.log('game data', game);

      socketHandler.on('connection', () => {
        console.log('sent connection request');
      });

      /**
       *
       * Game Listeners
       *
       */

      socketHandler.on('GAME_DATA', (data) => {
        dispatch({ type: ACTIONS.SET_GAME_DATA, payload: data });
      });

      socketHandler.on('TURN', (data) => {
        dispatch({ type: ACTIONS.SET_TURN, payload: data });
      });

      socketHandler.on('INIT', (data) => {
        console.log('player number init here = ', data);
        dispatch({ type: ACTIONS.SET_PLAYER_NUMBER, payload: data });
      });

      socketHandler.on('GAME_CODE', (data) => {
        console.log('new game code = ', data);
        dispatch({ type: ACTIONS.SET_ROOM, payload: data });
      });

      /**
       *
       * Error Listeners
       *
       */
      socketHandler.on('ROOM_FULL', (data) => {
        dispatch({ type: ACTIONS.SET_ERRORS, payload: data.errorMsg });
      });

      socketHandler.on('UNKNOWN_CODE', (data) => {
        dispatch({ type: ACTIONS.SET_ERRORS, payload: data.errorMsg });
      });

      socketHandler.on('UNKNOWN_ERROR', (data) => {
        dispatch({ type: ACTIONS.SET_ERRORS, payload: data.errorMsg });
      });
    }
  }, [socketHandler]);

  console.log('game in context = ', game);

  return (
    <div className="text-gray-700 mt-8 mx-auto max-w-sm flex flex-col">
      <span className="font-bold text-4xl text-center ">Play</span>

      <CreateScreen socketHandler={socketHandler} />
    </div>
  );
};
