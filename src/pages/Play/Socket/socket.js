import openSocket from 'socket.io-client';
import { getRefreshToken } from '../../../utils/tokenHandler/';

export function init() {
  const token = getRefreshToken();
  const socket = openSocket('http://localhost:5001/', {
    transports: ['websocket', 'polling'],
    query: {
      data: 'hello from client',
      token: token,
    },
    withCredentials: true,
  });

  return socket;
}
