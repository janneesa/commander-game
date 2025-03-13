# Commander Game

Commander Game is a web application designed to engage users in a fun and interactive way by guessing the creature types of Magic: The Gathering commanders. The application features two main modes: Daily Commander and Endless Mode. Endless mode is open for anyone, but for Daily Mode you need to signup.

## Description

Commander Game provides an engaging and interactive experience for Magic: The Gathering enthusiasts. Users can guess the creature types of randomly selected commander cards from the Scryfall API. The game offers two modes: Daily Commander, which resets daily, and Endless Mode, which continues until the user runs out of lives. The application tracks user progress, including high scores and remaining lives, and provides real-time feedback using toast notifications.

## Try it out

[Commander Game](https://commander-game.onrender.com/)

## Technologies Used

- Node.js
- Express.js
- React
- MongoDB
- Scryfall API
- TailwindCSS
- Git for version control

## Getting Started

### Dependencies

- Node.js (version 14 or higher)
- MongoDB
- npm (Node Package Manager)

### Installing

1. Clone the repository:
   ```bash
   git clone https://github.com/janneesa/commander-game.git
   ```
2. Navigate to the project directory:
   ```bash
   cd commander-game
   ```
3. Navigate to the server and client directories to install dependencies:
   ```bash
   cd server
   ```
   ```bash
   cd client
   ```
4. Install the dependencies in both directories:
   ```bash
   npm install
   ```
5. Set up your environment variables by creating a `.env` file in the server directory and adding the necessary configurations:

   ```
   NODE_ENV,
   PORT,
   MONGO_URI,
   TEST_MONGO_URI,
   LOCAL_MONGO_URI,
   SECRET
   ```

6. To build navigate to server directory and run command:
   ```bash
   npm run build
   ```

### Executing program

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Run the application:
   ```bash
   npm run start
   ```
3. Open your browser and navigate to `http://localhost:4000` to access the application.

## Help

## Authors

- Janne Savinainen
  [@janneesa](https://github.com/janneesa)

## Version History

## License

## Acknowledgments

- [Scryfall API](https://scryfall.com/docs/api) for providing the card data
- Inspiration from various Magic: The Gathering communities
- Code snippets from the following repositories:
