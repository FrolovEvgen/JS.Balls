// Start script.
console.log("Init...");

//= utils/config.js
//= utils/functions.js
//= engine/score.js
//= engine/lifes.js
//= engine/timer.js
//= engine/header.js
//= engine/ball.js
//= engine/canvas.js
//= engine/startblock.js
//= engine/endblock.js
//= engine/game.js
/**
 * Game application
 * @type Game
 */
var game = createGame();
// Init application.
game.init();
// Start application.
game.start();