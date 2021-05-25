import openSocket from 'socket.io-client';
import { getRefreshToken } from '../../../utils/tokenHandler/';

export function init() {
  const token = getRefreshToken();

  let url = 'http://localhost:5001/';

  if (process.env.NODE_ENV === 'production') {
    url = 'https://chain-reaction-backend.herokuapp.com:5001/';
  }

  const socket = openSocket(
    'https://chain-reaction-backend.herokuapp.com:5001/',
    {
      transports: ['websocket', 'polling'],
      query: {
        data: 'hello from client',
        token: token,
      },
      withCredentials: true,
    }
  );

  return socket;
}
