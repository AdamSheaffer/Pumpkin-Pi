const config = require('../firebase.config');
const fb = require('firebase/app');
require('firebase/database');

fb.initializeApp(config);

const ref = fb.database().ref('gameState');
let alreadyListening = false;
let previousGameState = null;

module.exports.onGameStateUpdate = (fn) => {
  if (alreadyListening) {
    throw new Error("Already for changes. Do not call onGameStateUpdate multiple times");
  }

  alreadyListening = true;
  ref.on('value', snapshot => {
    const newGameState = snapshot.val();
    fn(newGameState, previousGameState);
    previousGameState = newGameState;
  });
}