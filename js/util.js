'use strict'

function createMat(ROWS, COLS) {
    const mat = []
    for (var i = 0; i < ROWS; i++) {
        const row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}



function getAmountOfCellsContaining(BOARD, ITEM) {
    var amount = 0
    for (var i = 0; i < BOARD.length; i++) {
        for (var j = 0; j < BOARD[i].length; j++) {
            if (BOARD[i][j] === ITEM) amount++
        }
    }
    return amount
}

/*******************************/
/*Random*/
/*******************************/

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function getRandomOrderNumbersArray(MAX) {
    const nums = getArrayWithAscNums(MAX)
    var res = []
    for (var i = 0; i < MAX; i++) {
        res[i] = drawNum(nums)
    }
    return res
}

function getArrayWithAscNums(MAX) {
    var numbers = []
    for (var i = 0; i < MAX; i++) {
        numbers[i] = i + 1
    }
    return numbers
}

/*******************************/
/*Render*/
/*******************************/



// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}
/*******************************/
/*Misc*/
/*******************************/

function drawNum(NUMS) {
    return NUMS.splice(getRandomInt(0, NUMS.length), 1)[0]
}
