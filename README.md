# Express-Sequelize backend for www.chessopener.com

<img width="1792" alt="chessopener-1" src="https://user-images.githubusercontent.com/9075454/114387434-b9394200-9b92-11eb-8e73-917df505d704.png">

# Requirements

This application requires a local Postgres instance to be running.
(NOTE: I use nodemon to automatically restart the API upon changes detected in the code, either run `npm install -g nodemon` to install, or change the start-dev command to use node instead of nodemon in your package.json)

# Installation

Run `npm i`

In package.json, make sure the DATABASE_CONNECTION_STRING is correctly set to your local Postgres instance.

To create the database models run `setup-dev-db` (run this once upon project initialization)

Run the api with `npm run start-dev`

To get started with the API, contact me for an openings database export of 3000+ rows.
