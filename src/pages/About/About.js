import React from 'react';

export const About = () => {
  return (
    <div className="text-gray-700 mt-8 mx-auto max-w-sm flex flex-col text-center">
      <span className="font-bold text-4xl">About</span>
      <p>
        Chain reaction is a multiplayer game, in which players are assigned
        colors and take turns placing cells on the board. As soon as a cell
        reaches its limit, the cell explodes and spreads into the adjacent
        cells, changing the cell's color. As soon as the whole board is covered
        in a single color, the respective player wins.
      </p>
      <p>
        The source code is available at
        <br />
        <span className="text-lg text-blue-800">
          <a href="https://github.com/standmarsh/chain-reaction-backend">
            backend
          </a>{' '}
          <a href="https://github.com/standmarsh/chain-reaction-frontend">
            frontend
          </a>
        </span>
        <br />
        <span className="text-lg text-blue-800">
          Made by{' '}
          <a className="font-bold" href="https://github.com/standmarsh">
            Shagun Agrawal
          </a>
        </span>
      </p>
    </div>
  );
};
