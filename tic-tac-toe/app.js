'use strict'

// Interfacing methods
let games = [];
let currentInstance;

const clearBoard = function() {
  for (let i = 0; i <= 2; i++) {
    for (let j = 0; j <= 2; j++) {
      document.getElementById(`${i}, ${j}`).innerText = ' ';
      document.getElementById(`${i}, ${j}`).disabled = false;
    }
  }
};

const createNewGame = function() {
  let header = document.getElementById('header');

  currentInstance = new Instance();
  games.push(currentInstance);
  clearBoard();
  header.innerText = 'Tic-Tac-Toe';
};

const blockClick = function(xAxis, yAxis) {
  let header = document.getElementById('header');
  let currentButton = document.getElementById(`${xAxis}, ${yAxis}`)

  if (!currentInstance) {
    currentInstance = new Instance();
  }
  !currentInstance.turn ? header.innerText = 'Player One\'s turn' : header.innerText = 'Player Two\'s turn';
  currentInstance.onClick(xAxis, yAxis);
};
