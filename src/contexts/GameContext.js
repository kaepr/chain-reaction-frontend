import { createContext, useReducer } from 'react';
import gameReducer from '../reducers/gameReducer';

const initialState = {
  roomNumber: '',
  winner: 0,
  turn: 0,
  gameData: [],
  errorExists: false,
  errors: [],
  playerNumber: 0,
};

export const GameContext = createContext();

const GameProvider = (props) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);
  return (
    <GameContext.Provider value={{ gameState, dispatch }}>
      {props.children}
    </GameContext.Provider>
  );
};
export default GameProvider;
