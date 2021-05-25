# Chain Reaction Online Frontend

Frontend implemention of the chain reaction game. 

[Backend implementation](https://github.com/standmarsh/chain-reaction-backend)

## About
Chain reaction is a multiplayer game, in which players are assigned colors and take turns placing cells on the board. As soon as a cell reaches its limit, the cell explodes and spreads into the adjacent cells, changing the cell's color. As soon as the whole board is covered in a single color, the respective player wins.

The project uses React for the frontend framework. Used react query for handling server side queries, and jotai for local state management.

## Project Setup 
1. Clone the frontend repository

   ```
   git clone https://github.com/standmarsh/chain-reaction-frontend.git
   ```

2. Install the dependencies

   ```
   npm install
   ```

3. Start server

   ```javascript
   npm run start // development
   ```

## References

[Original Game Play Store Link](https://play.google.com/store/apps/details?id=com.BuddyMattEnt.ChainReaction&hl=en_IN&gl=US)

Help in implementing game logic from [Sarthak Mittal's Repo](https://github.com/Sarthak-Mittal/chain-reaction)


