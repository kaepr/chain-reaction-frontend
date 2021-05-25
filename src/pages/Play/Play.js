import React, { useEffect, useState, useContext } from 'react';
import { init } from './Socket';
import { GameContext } from '../../contexts/GameContext';
import ACTIONS from '../../types/gameTypes';
import WaitRoomScreen from './components/WaitRoomScreen';
import CreateScreen from './components/CreateScreen';
import GameScreen from './components/GameScreen';

export const Play = () => {
  const [socketHandler, setSocketHandler] = useState(null);
  const { gameState, dispatch } = useContext(GameContext);

  useEffect(() => {
    const socketClient = init();
    setSocketHandler(socketClient);

    return () => {
      socketClient.emit('LEFT_ROOM');
      socketClient.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socketHandler !== null) {
      socketHandler.on('connection', () => {
        // console.log('sent connection request');
      });

      /**
       * Game Listeners
       */
      socketHandler.on('GAME_DATA', (data) => {
        dispatch({ type: ACTIONS.SET_GAME_DATA, payload: data });
      });

      socketHandler.on('TURN', (data) => {
        dispatch({ type: ACTIONS.SET_TURN, payload: data });
      });

      socketHandler.on('INIT', (data) => {
        dispatch({ type: ACTIONS.SET_PLAYER_NUMBER, payload: data });
      });

      socketHandler.on('GAME_CODE', (data) => {
        dispatch({ type: ACTIONS.SET_ROOM, payload: data });
      });

      socketHandler.on('IS_WINNER', (data) => {
        console.log('winner check = ', data);
        dispatch({ type: ACTIONS.SET_WINNER, payload: data });
      });

      /**
       * Error Listeners
       */
      socketHandler.on('ROOM_FULL', (data) => {
        console.log('errors', data);
        dispatch({ type: ACTIONS.SET_ERRORS, payload: data.errorMsg });
      });

      socketHandler.on('UNKNOWN_CODE', (data) => {
        dispatch({ type: ACTIONS.SET_ERRORS, payload: data.errorMsg });
      });

      socketHandler.on('UNKNOWN_ERROR', (data) => {
        dispatch({ type: ACTIONS.SET_ERRORS, payload: data.errorMsg });
      });

      socketHandler.on('connect_error', (data) => {
        console.log('data from not authorized', data.data);
        dispatch({ type: ACTIONS.SET_ERRORS, payload: data.data.content });
      });
    }
  }, [socketHandler]);

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: ACTIONS.CLEAR_ERRORS });
    }, 5000);
  }, [gameState]);

  return (
    <div className="text-gray-700 mt-8 mx-auto max-w-sm flex flex-col">
      <span className="font-bold text-4xl text-center ">Play</span>
      {gameState.errors.map((item, index) => {
        return (
          <div
            key={index}
            className="mt-4 max-w-xs mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{item}</span>
          </div>
        );
      })}

      {gameState.playerNumber === 0 && (
        <CreateScreen socketHandler={socketHandler} />
      )}

      {gameState.playerNumber === 1 && gameState.gameData.length === 0 && (
        <WaitRoomScreen />
      )}

      {gameState.winner !== 0 && (
        <div className="mt-4 flex flex-col content-center justify-center text-center"></div>
      )}

      {gameState.gameData.length !== 0 && (
        <GameScreen socketHandler={socketHandler} />
      )}
    </div>
  );
};
