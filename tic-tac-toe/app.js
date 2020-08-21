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


// Board methods
const Instance = function() {
  this.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  this.turn = true;
  this.turnCount = 1;
  this.won = false;
};

Instance.prototype.winCondition = function() {
  const diagonalL = this.leftDiagonal();
  const diagonalR = this.rightDiagonal();
  const rowCheck = this.row();
  const colCheck = this.column();

  if (!!diagonalL || !!diagonalR || !!rowCheck || !!colCheck) {
    this.won = true;
    this.endGame();
  } else if (this.won === false && this.turnCount === 10) {
    return this.draw();
  }
  return this.won;
};

Instance.prototype.draw = function() {
  let header = document.getElementById('header')
  return header.innerText = 'Draw!'
};

Instance.prototype.endGame = function() {
  let header = document.getElementById('header')

  if (this.turn  === false && this.winCondition !== false) {
    return header.innerText = "Player One Wins!!";
  }
  if (this.turn === true && this.winCondition !== false) {
    return header.innerText = "Player Two Wins!!";
  }

  // return header.innerText = "Draw!!"
};

// Render X or O onto board.
Instance.prototype.onClick = function(xAxis, yAxis) {
  let playerMarker = 1;
  let toRender = 'X';
  let currentButtonName = document.getElementById(`${xAxis}, ${yAxis}`);

  if (!this.turn) {
    playerMarker = 2;
    toRender = 'O';
  }
  this.board[xAxis][yAxis] = playerMarker;
  this.turn = !this.turn;
  this.turnCount++;
  currentButtonName.innerText = `${toRender}`;
  this.winCondition();
  currentButtonName.disabled = true;
};

// Check horizontals for win condition.
Instance.prototype.leftDiagonal = function() {
  const currentMarker = this.board[0][0];
  const middleMarker = this.board[1][1];
  const lastMarker = this.board[2][2];
  let win = false;

  if (currentMarker !== 0 && middleMarker !== 0 && lastMarker !== 0) {
    if (currentMarker === middleMarker) {
      if (middleMarker === lastMarker) {
        return win = true;
      }
    }
  }
  return win;
};

Instance.prototype.rightDiagonal = function() {
  const currentMarker = this.board[2][0];
  const middleMarker = this.board[1][1];
  const lastMarker = this.board[0][2];
  let win = false;

  if (currentMarker !== 0 && middleMarker !== 0 && lastMarker !== 0) {
    if (currentMarker === middleMarker) {
      if (middleMarker === lastMarker) {
        return win = true;
      }
    }
  }
  return win;
};

// Check rows and columns for win condition.
Instance.prototype.row = function() {
  let win = false;

  for (let i = 0; i < this.board.length; i++) {
    let currentMarker = this.board[i][0];
    let middleMarker = this.board[i][1];
    let lastMarker = this.board[i][2];

    if (currentMarker !== 0 && middleMarker !== 0 && lastMarker !== 0) {
      if (currentMarker === middleMarker) {
        win = false;
        if (middleMarker === lastMarker) {
          win = true;
          return win;
        }
      }
    }
  }
  return win;
};

Instance.prototype.column = function() {
  let win = false;

  for (let i = 0; i < this.board.length; i++) {
    let currentMarker = this.board[0][i];
    let middleMarker = this.board[1][i];
    let lastMarker = this.board[2][i];

    if (currentMarker !== 0 && middleMarker !== 0 && lastMarker !== 0) {
      if (currentMarker === middleMarker) {
        win = false;
        if (middleMarker === lastMarker) {
          win = true;
          return win;
        }
      }
    }
  }
  return win;
};