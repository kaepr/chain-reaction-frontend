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

![image](https://user-images.githubusercontent.com/51134776/204082361-b609c0d8-ada1-4769-a8d0-23d5daf9fb60.png)

![image](https://user-images.githubusercontent.com/51134776/204082384-cfa0a0aa-d26e-4835-816f-93116f1455d9.png)

![image](https://user-images.githubusercontent.com/51134776/204082402-e0f4dc28-609c-4f66-83c3-1fcdce49f9ee.png)

![image](https://user-images.githubusercontent.com/51134776/204082437-a5d9d39a-b49c-4647-a819-4ba4f30bd012.png)



## References

[Original Game Play Store Link](https://play.google.com/store/apps/details?id=com.BuddyMattEnt.ChainReaction&hl=en_IN&gl=US)

Help in implementing game logic from [Sarthak Mittal's Repo](https://github.com/Sarthak-Mittal/chain-reaction)
