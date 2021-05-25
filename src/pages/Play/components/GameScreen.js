import React, { useContext } from 'react';
import { GameContext } from '../../../contexts/GameContext';
import GameGrid from './GameGrid';

const GameScreen = ({ socketHandler }) => {
  const { gameState } = useContext(GameContext);

  // Handles submitting for Player 1

  return (
    <>
      <div className="mt-4 flex flex-col content-center justify-center text-center">
        <p className="text-lg">In Room Code</p>
        <p className="text-lg">{gameState.roomNumber}</p>
        <p className="text-lg">Your Player Number = {gameState.playerNumber}</p>
        <p className="text-lg">Current Player Turn = {gameState.turn}</p>

        {gameState.winner !== 0 && (
          <p className="text-lg">Winner = {gameState.winner}</p>
        )}
      </div>

      <GameGrid socketHandler={socketHandler} />
    </>
  );
};

export default GameScreen;
