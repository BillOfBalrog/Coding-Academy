'use strict'

const MINE = '💣' 
const FLAG = '🚩'
const CELL = '🔲'

// Model
const gGame = { 
    isOn: false, 
    shownCount: 0, 
    markedCount: 0, 
    secsPassed: 0 
} 
var gBoard
const gLevel = { 
    SIZE: 4, 
    MINES: 2 
} 
  
// This is called when page loads
function onInit() {
    gBoard = buildBoard()

    renderBoard(gBoard)
}

// Builds the board Set the minesCall setMinesNegsCount() Return the created board
function buildBoard() {
    const board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = createCell()
        }
    }

    setMinesOnBoard(board) 
    setMinesNegsCount(board)

    return board
}

// Render the board as a <table> to the page
function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}" onclick="onCellClicked(this, ${i}, ${j})" 
                        oncontextmenu="onCellMarked(this, ${i}, ${j})"onmark=)">${CELL}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

//// Set mines on board randomly [custom function not included in instructions]
function setMinesOnBoard(board) {
    ////// Hard coded mines
    board[0][0].isMine = true
    board[0][1].isMine = true

    ///////////Randomly set mines without any specific rule set
    //////////
    // var minesCount = gLevel.MINES
    // while (minesCount > 0) {
    //     const rndRowIdx = getRandomInt(0, gLevel.SIZE)
    //     const rndColIdx = getRandomInt(0, gLevel.SIZE)
    //     if (!board[rndRowIdx][rndColIdx].isMine) {
    //         var cell = board[rndRowIdx][rndColIdx]
    //         cell.isMine = true
    //         minesCount--
    //         console.log (`setMinesOnBoard: Mine placed at [${rndRowIdx}][${rndColIdx}]`)
    //     }
    // }
}

// Count mines around a cell and set the cell's minesAroundCount.
// ==> this function will call getMinesNegsCount() to count mines around a cell
function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            const cellMinesNegsCount = getMinesNegsCount(i, j, board)
            if (cellMinesNegsCount) {
                const cell = board[i][j]
                cell.minesAroundCount = cellMinesNegsCount
                // console.log (`setMinesNegsCount: cell [${i}][${j}] minesAroundCount: ${cellMinesNegsCount}`)
            }
        }
    }
}

// Count mines around the given cell 
function getMinesNegsCount(cellI, cellJ, board) {
    var minesCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= board[i].length) continue
            if (board[i][j].isMine) {
                minesCount++
            }
        }
    }
    // console.log (`getMinesNegsCount: Mines found around cell [${cellI}][${cellJ}] count: ${minesCount}`)
    return minesCount
}



// Called when a cell is clicked
function onCellClicked(elCell, i, j)  {

}

// Called when a cell is right clicked
// See how you can hide the context menu on right click
function onCellMarked(elCell) {

}

// Game ends when all mines are marked, and all the other cells are shown
function checkGameOver() {

}

// When user clicks a cell with no mines around, we need to open 
// not only that cell, but also its neighbors.
function expandShown(board, elCell, i, j) {

}

/* 
NOTE: start with a basic implementation that only opens 
the non-mine 1st degree neighbors.

BONUS: if you have the time later, try to work more like the 
real algorithm (see description at the Bonuses section below)
*/

function createCell() { 
    return {
        minesAroundCount: 4, 
        isShown: false, 
        isMine: false, 
        isMarked: true 
    }
}

function renderCell(location, value) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}


 


