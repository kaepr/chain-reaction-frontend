import ACTIONS from '../types/gameTypes';

function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_ROOM:
      return {
        ...state,
        roomNumber: action.payload,
      };

    case ACTIONS.SET_GAME_DATA:
      return {
        ...state,
        gameData: action.payload,
      };

    case ACTIONS.SET_ERRORS:
      return {
        ...state,
        errors: [...state.errors, action.payload],
      };

    case ACTIONS.SET_TURN:
      return {
        ...state,
        turn: action.payload,
      };

    case ACTIONS.SET_PLAYER_NUMBER:
      return {
        ...state,
        playerNumber: action.payload,
      };

    case ACTIONS.SET_WINNER:
      return {
        ...state,
        winner: action.payload,
      };

    case ACTIONS.CLEAR_ERRORS:
      return {
        ...state,
        errors: [],
      };

    default:
      return state;
  }
}

export default gameReducer;
