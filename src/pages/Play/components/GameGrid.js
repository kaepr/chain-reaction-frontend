import React, { useContext } from 'react';
import { GameContext } from '../../../contexts/GameContext';
import GameCell from './GameCell';

const GameGrid = ({ socketHandler }) => {
  const { gameState } = useContext(GameContext);

  // Handles submitting for Player 1

  function handleClick(x, y) {
    if (gameState.winner === 0) {
      let clickedOwner = gameState.gameData[x][y].owner;
      if (clickedOwner === gameState.playerNumber || clickedOwner === 0) {
        const playernInputTurn = gameState.playerNumber;
        socketHandler.emit('PLAYER_INPUT', {
          x,
          y,
          playerTurn: playernInputTurn,
        });
      }
    }
  }

  return (
    <div className="flex justify-center items-center">
      <div>
        {gameState.gameData !== null && (
          <DrawBoard onClick={handleClick} data={gameState.gameData} />
        )}
      </div>
    </div>
  );
};

const DrawBoard = (dataBoard) => {
  if (dataBoard.data.length !== 0) {
    return (
      <>
        <div className="flex flex-col text-black mt-8 mb-8">
          {dataBoard.data.map((datarow, index) => {
            return (
              <>
                <div key={index} className="flex flex-row">
                  {datarow.map((dataitem) => {
                    return (
                      <div>
                        <div
                          className=""
                          key={dataitem.x * datarow.length + dataitem.y}
                          onClick={() =>
                            dataBoard.onClick(dataitem.x, dataitem.y)
                          }
                        >
                          <GameCell dataIndividual={dataitem} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            );
          })}
        </div>
      </>
    );
  }

  return <></>;
};

export default GameGrid;
