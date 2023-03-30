'use strict'

const MINE_IMG = '💣'
const FLAG_IMG = '🚩'
const SMILEY_IMG = '☺️'
const LIFE_IMG = '🧬'
const BOOM_IMG = '💥'
const EMPTY = ''

const elMinesCount = document.querySelector('.mines-count')
const elLives = document.querySelector('.lives')
const elTimer = document.querySelector('.timer')
const elScore = document.querySelector('.score')
const elRetartBtn = document.querySelector('.restart-btn')

function onInit() {
    gFirstClick = true
    gGame = restartGame()
    gBoard = createBoard()
    renderBoard(gBoard)
}

var gMinesCount
var gBoard
var gLives
var gGame
var gTimer
var gLives
var gLevel = beginnerLevel
var gMinesLocation = []
var gFirstClick


const beginnerLevel = {
    SIZE: 4,
    minesCount: 2,
}

const mediumLevel = {
    SIZE: 8,
    minesCount: 12,
}

const expertLevel = {
    SIZE: 12,
    minesCount: 32,
}


function restartGame() {
    return {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
}
function createBoard() {
    const board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = createCell(i, j)
        }
    }
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = ''
            const className = `cell cell--board cell-${i}-${j}`
            strHTML += `<td class="${className}" onclick="onCellClicked(event,this, ${i}, ${j})" oncontextmenu="onCellClicked(event,this, ${i}, ${j})">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elBoard = document.querySelector('.board-container')
    const elResetBtn = document.querySelector('smiley-btn span')
    elBoard.innerHTML = strHTML
    elResetBtn.innerText = SMILEY_IMG
}


function createCell(cellI, cellJ) {
    var cell = {
        pos: {
            i: cellI,
            j: cellJ
        },
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
    }
    return cell
}

function countNeighbors(board, cell) {
    var neighborMines = 0
    for (var i = cell.pos.i - 1; i <= cell.pos.i + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = cell.pos.j - 1; j <= cell.pos.j + 1; j++) {
            if (j < 0 || j > board[i].length - 1 || (i === cell.pos.j && j === cell.pos.j)) continue
            if (board[i][j].isMine) neighborMines++
        }
    }
    return neighborMines
}

function createMines(board) {
    for (var i = 0; i < gLevel.MINES; i++) {
        const mineRow = getRandomInt(0, gLevel.SIZE)
        const mineCol = getRandomInt(0, gLevel.SIZE)
        board[mineRow][mineCol].isMine = true
        gMinesLocation.push({ mineRow, mineCol })
        gMinesCount++
    }
}

function setMinesNegsCount(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            var currentCell = board[i][j]
            if (currentCell.isMine) continue
            board[i][j].minesAround = countNeighbors(board, i, j)
        }
    }
}

function setLevel(level) {
    gLevel = level
    onInit()
}

function onCellMarked(cell) {
    if (!gGame.isOn) return
    const currCell = gBoard[cell.pos.i][cell.pos.j]
    currCell.isMarked = !currCell.isMarked
    renderCell(cell.pos, FLAG_IMG)
}

function onCellClicked(cell) {
    if (!gGame.isOn) return
    const currCell = gBoard[cell.pos.i][cell.pos.j]
    if (currCell.isMarked || currCell.isShown) return
    if (gFirstClick) firstOnClick()
    if (currCell.isMine) onMineClicked(cell)
    currCell.isShown = true
    showCell(cell)
}


function onMineClicked(cell) {
    if (gLives > 0) {
        gLives--
        renderLives(gLives)
        cell.isMarked = true
        cell.isShown = true
    }
    renderCell(cell.pos, MINE_IMG)
}

function firstOnClick() {
    gGame.isOn = true
    gFirstClick = false
    gTimer = 0
    startTimer()
    createMines(gBoard)
}

function renderLives(num) {
    for (var i = 0; i < num; i++) {
        elLives.innerText += LIFE_IMG
    }
}

function checkGameOver() {
    if (gGame.ShownCount + gGame.markedCount === gLevel.SIZE * gLevel.SIZE) {
        gGame.isOn = false
        stopTimer()
    }
}

function showCells(cell) {
    const currCell = gBoard[cell.pos.i][cell.pos.j]
    if (currCell.isShown) return
    showCell(cell)
    if (currCell.minesAroundCount > 0) return
    if (currCell.minesAroundCount === 0) {
        for (var i = cellI - 1; i <= cellI + 1; i++) {
            if (i < 0 || i > gBoard.length - 1) continue
            for (var j = cellJ - 1; j <= cellJ + 1; j++) {
                if (j < 0 || j > gBoard[i].length - 1 || (i === cellI && j === cellJ)) continue
                showCells(cellI, cellJ)

            }
        }
    }
}

function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location.i, location.j)
    var elCell = document.querySelector(cellSelector)
    elCell.innerHTML = value
}


function showCell(cell) {
    const currCell = gBoard[cell.pos.i][cell.pos.j]
    if (curCell.MinesAroundCount > 0) {
        renderCell(cell, currcell.MinesAroundCount)
    } else renderCell(cell, EMPTY)

    currCell.isShown = true
    gGame.shownCount++
    return
}



function startTimer() {
    gTimer = setInterval(() => {
        gGame.secsPassed++
        elTimer.innerText = gGame.secsPassed
    }, 1000);
}

function stopTimer() {
    clearInterval(gTimer)
    gTimer = 0
}
