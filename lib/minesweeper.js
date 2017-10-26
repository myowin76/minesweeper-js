'use strict';

//LEGACY CODES

var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
	var board = [];

	for (var i = 0; i < numberOfRows; i++) {
		var row = [];

		for (var j = 0; j < numberOfColumns; j++) {
			row.push(null);
		}

		board.push(row);
	}

	var numberOfBombsPlaced = 0;

	while (numberOfBombsPlaced < numberOfBombs) {
		var randomRowIndex = Math.floor(Math.random() * numberOfRows);
		var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
		if (board[randomRowIndex][randomColumnIndex] !== 'B') {
			board[randomRowIndex][randomColumnIndex] = 'B';
			numberOfBombsPlaced++;
		}
	}

	return board;
};

var getNumberOfNeighborBombs = function getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex) {
	var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

	var numberOfRows = bombBoard.length;
	var numberOfColumns = bombBoard[0].length;
	var numberOfBombs = 0;

	neighborOffsets.forEach(function (offset) {
		var neighborRowIndex = rowIndex + offset[0];
		var neighborColumnIndex = columnIndex + offset[1];

		if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {

			if (bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
				numberOfBombs++;
			}
		}
	});

	return numberOfBombs;
};

var flipTile = function flipTile(playerBoard, bombBoard, rowIndex, columnIndex) {
	if (playerBoard[rowIndex][columnIndex] !== ' ') {
		console.log('This tile has already been flipped!');
		return;
	} else if (bombBoard[rowIndex][columnIndex] === 'B') {
		playerBoard[rowIndex][columnIndex] = 'B';
	} else {
		playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
	}
};

var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
	var board = [];

	for (var i = 0; i < numberOfRows; i++) {
		var row = [];

		for (var j = 0; j < numberOfColumns; j++) {
			row.push(' ');
		}

		board.push(row);
	}

	return board;
};

//console.log(generatePlayerBoard(2,3));

print = function print(board) {

	console.log(board.map(function (row) {
		return row.join(' | ');
	}).join('\n'));
};

var playerBoard = generatePlayerBoard(3, 4);
var bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board: ');
printBoard(playerBoard);

/////////////////

// const printBoard = board => {
//   console.log('Current Board:');
//   console.log(board[0].join('|'));
//   console.log(board[1].join('|'));
//   console.log(board[2].join('|'));
// }

// const blankLine = ' | | ';
// const guessLine = '1| | ';
// const bombLine  = ' |B| ';

// const board = [
// 	[' ',' ',' '],
// 	[' ',' ',' '],
// 	[' ',' ',' ']
// ];

// printBoard(board);
// board[0][1] = '1';
// board[2][2] = 'B';
// printBoard(board);

//console.log('This is what an empty board would look like:');

//console.log(blankLine);
//console.log(blankLine);
//console.log(blankLine);

//console.log('This is what a board with a guess and a bomb on it would look like:');
//console.log(guessLine);
//console.log(bombLine);
//console.log(blankLine);