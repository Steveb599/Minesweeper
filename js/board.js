'use strict'

function renderBoard() {
    var strHTML = ''
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < gBoard.length; j++) {
            var cellClass = `cell-${i}-${j}`
            strHTML += `<td class="cell ${cellClass}"  
            oncontextmenu="onCellMarked(this,${i},${j})" onclick="onCellClicked(this,${i},${j})">`
            strHTML += '</td>\n'
        }
        strHTML += '</tr>\n'
    }
    const elBoard = document.querySelector('.board-container')
    elBoard.innerHTML += strHTML
}

function createBoard() {
    const board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = createCell(i, j)
        }
    }
    board[1][1].isMine = board[3][2].isMine = true

    return board
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