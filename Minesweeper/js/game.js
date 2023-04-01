'use strict';

const MINE_IMG = '💣'
const FLAG_IMG = '🚩'
const SMILEY_IMG = `image/smiley.png`
const LIFE_IMG = '🧬'
const SUNGLASSES_SMILEY = `image/sunglasses-smiley.png`
const LOSE_SMILEY = `image/lose-smiley.png`
const BOOM_IMG = '💥'
const EMPTY = ''

const elMinesCount = document.querySelector('.mines-count')
const elLives = document.querySelector('.lives span')
const elTimer = document.querySelector('.timer span')
const elScore = document.querySelector('.score')
const elResetBtn = document.querySelector('.smiley-btn span')

var img = document.createElement('img');
img.style = 'width:30px;';

const beginnerLevel = {
  SIZE: 4,
  MINES: 2,
};

const mediumLevel = {
  SIZE: 8,
  MINES: 12,
};

const expertLevel = {
  SIZE: 12,
  MINES: 32,
};

var gMinesCount
var gBoard
var gGame
var gTimer
var gLives
var gMinesLocation = []
var gFirstClick
var gLevel = beginnerLevel

function onInit() {
  img.src = SMILEY_IMG
  gFirstClick = true
  gGame = restartGame()
  gLives = 3
  renderLives(gLives)
  gBoard = createBoard()
  renderBoard(gBoard)
  elTimer.innerText = '0 Secs have passed'
}

function setLevels(strLevel) {
  switch (strLevel) {
    case 'beginner':
      gLevel = beginnerLevel;
      break;
    case 'medium':
      gLevel = mediumLevel;
      break;
    case 'expert':
      gLevel = expertLevel;
      break;
  }

  onInit();
}

function renderBoard(board) {
  var strHTML = '<table>'
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < board[0].length; j++) {
      var cell = ''
      const className = `cell cell--board cell-${i}-${j}`;
      strHTML += `<td class="${className}" onclick="onCellClicked(createCell(${i}, ${j}))" oncontextmenu="onCellMarked(event, createCell(${i}, ${j}))">${cell}</td>`
    }
    strHTML += '</tr>'
  }
  strHTML += '</table>'
  const elBoard = document.querySelector('.board-container')
  elBoard.innerHTML = strHTML

  elResetBtn.appendChild(img);
}

function createBoard() {
  const board = []
  var size = gLevel.SIZE
  gMinesCount = gLevel.MINES;
  for (var i = 0; i < size; i++) {
    board[i] = []
    for (var j = 0; j < size; j++) {
      board[i][j] = createCell(i, j);
    }
  }
  return board
}

function restartGame() {
  return {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
  };
}

function createCell(cellI, cellJ) {
  var cell = {
    pos: {
      i: cellI,
      j: cellJ,
    },
    minesAroundCount: 0,
    isShown: false,
    isMine: false,
    isMarked: false,
  };
  return cell;
}

function countNeighbors(board, cell) {
  var neighborMines = 0
  for (var i = cell.pos.i - 1; i <= cell.pos.i + 1; i++) {
    if (i < 0 || i > board.length - 1) continue;
    for (var j = cell.pos.j - 1; j <= cell.pos.j + 1; j++) {
      if (
        j < 0 ||
        j > board[i].length - 1 ||
        (i === cell.pos.j && j === cell.pos.j)
      )
        continue;
      if (board[i][j].isMine) neighborMines++
    }
  }
  return neighborMines;
}

function createMines(board) {
  for (var i = 0; i < gLevel.MINES; i++) {
    setMine(board)
  }
}

function setMine(board) {
  const mineRow = getRandomInt(0, gLevel.SIZE)
  const mineCol = getRandomInt(0, gLevel.SIZE)
  if (board[mineRow][mineCol].isMine) setMine(board)
  else board[mineRow][mineCol].isMine = true
}


function onCellMarked(event, cell) {
  if (!gGame.isOn) return
  gGame.markedCount++
  renderCell(cell, FLAG_IMG)
}

function onCellClicked(cell) {
  if (!gGame.isOn) return
  const currCell = gBoard[cell.pos.i][cell.pos.j]
  if (currCell.isMarked || currCell.isShown) return
  if (gFirstClick) firstOnClick()
  if (currCell.isMine) onMineClicked(cell)
  else {
    showCell(cell)
    currCell.isShown = true
    checkGameOver()
  }
}

function onMineClicked(cell) {
  if (gLives > 0) {
    gLives--
    renderLives(gLives)
    cell.isShown = true
  }
  renderCell(cell, MINE_IMG)
  checkGameOver()
}

function firstOnClick() {
  gGame.isOn = true
  gFirstClick = false
  gTimer = 0
  startTimer()
  createMines(gBoard)
}

function renderLives(num) {
  elLives.innerText = ''
  for (var i = 0; i < num; i++) {
    elLives.innerText += LIFE_IMG
  }
}

function checkGameOver() {
  if (
    gGame.shownCount + gGame.markedCount + 3 - gLives ===
    gLevel.SIZE * gLevel.SIZE
  ) {
    img.src = SUNGLASSES_SMILEY
    elResetBtn.appendChild(img)
    gGame.isOn = false
    stopTimer()
    alert('You have won!')
  }

  if (gLives === 0) {
    img.src = LOSE_SMILEY
    img.style = 'width:70px;';
    elResetBtn.appendChild(img)
    gGame.isOn = false
    stopTimer()
    alert('You have lost!')
  }
}


function expandShown(board, cell) {
  for (var i = -1; i < 2; i++) {
    for (var j = -1; j < 2; j++) {
      if (i === 0 && j === 0) {
        continue;
      }
      var row = cell.pos.i + i
      var col = cell.pos.j + j
      if (
        row >= 0 &&
        row < board.length &&
        col >= 0 &&
        col < board[0].length &&
        !board[row][col].isMine &&
        !board[row][col].isShown
      ) {
        var newCell = board[row][col]
        board[row][col].isShown = true
        gGame.shownCount++
        var numOfNeighbors = countNeighbors(board, newCell)
        if (numOfNeighbors === 0) {
          renderCell(newCell, EMPTY)
          expandShown(board, newCell)
        } else {
          renderCell(newCell, numOfNeighbors)
        }
      }
    }
  }
}


function getClassName(i, j) {
  var cellClass = `cell-${i}-${j}`
  return cellClass
}

function renderCell(cell, value) {
  var cellSelector = '.' + getClassName(cell.pos.i, cell.pos.j)
  var elCell = document.querySelector(cellSelector)
  if (value === EMPTY || value > 0) elCell.style.backgroundColor = 'white'
  elCell.innerHTML = value
}


function showCell(cell) {
  if (cell.isMine) return;
  const currCell = gBoard[cell.pos.i][cell.pos.j]
  var numOfNeighbors = countNeighbors(gBoard, cell)
  if (numOfNeighbors > 0) {
    renderCell(cell, numOfNeighbors)
  } else {
    renderCell(cell, EMPTY)
    expandShown(gBoard, cell)
  }
  currCell.isShown = true
  gGame.shownCount++
  return;
}


function startTimer() {
  gTimer = setInterval(() => {
    gGame.secsPassed++;
    elTimer.innerText = gGame.secsPassed + ' Secs have passed';
  }, 1000);
}

function stopTimer() {
  clearInterval(gTimer)
  gTimer = 0
}
