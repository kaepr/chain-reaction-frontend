import React, { useContext } from 'react';
import { GameContext } from '../../../contexts/GameContext';
import ACTIONS from '../../../types/gameTypes';

const CreateScreen = ({ socketHandler }) => {
  const { gameState, dispatch } = useContext(GameContext);

  // Handles submitting for Player 1
  function joinRoom(e) {
    e.preventDefault();
    socketHandler.emit('JOIN_SERVER');
    socketHandler.emit('NEW_GAME');
  }

  function handleChange(value) {
    dispatch({ type: ACTIONS.SET_ROOM, payload: value });
  }

  // Handles submitting for Player 2
  function handleSubmit(e) {
    e.preventDefault();
    socketHandler.emit('JOIN_SERVER');
    socketHandler.emit('JOIN_GAME', gameState.roomNumber);
  }

  return (
    <>
      <div className="mt-4 flex flex-col content-center justify-center text-center">
        <p className="text-lg">Create your own Room</p>
        <button
          className=" inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          type="submit"
          onClick={(e) => joinRoom(e)}
        >
          Create Room
        </button>
      </div>

      <div className="mt-4 flex flex-col content-center justify-center text-center">
        <p className="text-lg">Or submit a room code</p>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="roomname"
          type="text"
          placeholder="Room code here"
          name="room"
          onChange={(e) => handleChange(e.target.value)}
          required
        />
        <button
          className="mt-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Submit Room Code
        </button>
      </div>
    </>
  );
};

export default CreateScreen;
