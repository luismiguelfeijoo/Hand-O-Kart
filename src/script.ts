import * as handTrack from 'handtrackjs';
import { Game } from './game.js';
import { LoadFiles } from './imageLoad.js';

let trackButton = document.getElementById('trackbutton');
let updateNote = document.getElementById('updatenote');
let intro = document.getElementsByClassName('intro').item(0);
let startMessage = document.getElementsByClassName('small').item(0);
let game;

// Load the model.
window.onload = function () {
  if (!trackButton || !updateNote || !intro || !startMessage) {
    return;
  }
  game = new Game(trackButton, updateNote);
  handTrack.load(game.modelParams).then((lmodel) => {
    // detect objects in the image.
    game.model = lmodel;
    updateNote.innerText = 'Ready to play!';
    trackButton?.classList.toggle('hide');
    trackButton.disabled = false;
    LoadFiles.load.then((a) => {
      trackButton.classList.add('show');
      startMessage.classList.remove('hide');
      startMessage.classList.add('show');
    });
  });
};

if (trackButton) {
  trackButton.addEventListener('click', function () {
    intro?.classList.add('hide');
    if (trackButton.innerText == 'restart') {
      game = new Game(trackButton, updateNote);
      game.restart = true;
    }
    game.toggleVideo();
    game.init();
    game.toggleButton();
  });
}

