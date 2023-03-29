'use strict'

const MINE = '💣'
const FLAG = '<img src="img/flag-image.png">'

var gBoard

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gMinesCount = 2
var minesLocation = []
var firstClick = true


function getMinesCount(board, cellI, cellJ) {
    var minesCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j > board[i].length - 1 || (i === cellI && j === cellJ)) continue
            if (board[i][j] === MINE) minesCount++
        }
    }
    return minesCount
}

function onInit() {
    gGame.isOn = true
    gBoard = createBoard()
    renderBoard(gBoard, '.board-container')
}

function onCellMarked(elCell) {
    if (firstClick) firstOnClick(cell,)
}

function onCellClicked(elCell, i, j) {
    var currCell = gBoard[i][j]
    if (cell.isMarked || Cell.isShown) return
    currCell.isShown = true
    if (cell.isMine) onMine()
}

function onMine() {
    renderCell
    checkGameOver()
}

function firstOnClick() {
    gGame.isOn = true
    firstClick = false

}


function setMinesNegsCount(board) {

}

function onCellClicked(elCell, i, j) {
    const currCell = gBoard[i][j]
    currCell.isClicked = true

}

function checkGameOver() {
    if ()
}

var gLevel = {
    SIZE: 4,
    MINES: 2
}


function renderCell(location, value) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

