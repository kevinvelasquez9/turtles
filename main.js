import Game from './model/Game.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const game = new Game(canvas, ctx);

game.play();
