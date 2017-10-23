class Game {
	constructor(numberOfRows, numberOfColumns, numberOfBombs){
		this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs)
	}

	playMove(rowIndex, columnIndex){
		this._board.flipTile(rowIndex, columnIndex)
		if (this._board.playerBoard[rowIndex, columnIndex] === 'B' ){
			console.log('Catch the Bomb, the game is over');
			
		}else if(this.hasSafeTiles) {
			console.log('Congratulation, You won!');

		}else{
			console.log('Current Board:');
			console.log(this._board);

		}

		this._board.print;
	}
}

class Board {
	constructor(numberOfRows, numberOfColumns, numberOfBombs){
		this._numberOfBombs = numberOfBombs;
		this._numberOfTiles = numberOfRows * numberOfColumns;
		this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
		this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);

	}

	get playerBoard(){
		return this._playerBoard;
	}

	flipTile(rowIndex, columnIndex){
		if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
			console.log('This tile has already been flipped!');
			return
		}else if(this._bombBoard[rowIndex][columnIndex] === 'B') {
			this._playerBoard[rowIndex][columnIndex] = 'B';
		}else{
			this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
		}

		this._numberOfTiles --;

	}

	getNumberOfNeighborBombs(rowIndex, columnIndex){
		const neighborOffsets = [
			[-1,-1],
			[-1,0],
			[-1,1],
			[0,-1],
			[0,1],
			[1,-1],
			[1,0],
			[1,1]
		];

		const numberOfRows = this._bombBoard.length;
		const numberOfColumns = this._bombBoard[0].length;
		let numberOfBombs = 0;

		neighborOffsets.forEach(offset => {
			const neighborRowIndex = rowIndex + offset[0];
			const neighborColumnIndex = columnIndex + offset[1];

			if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {

				if (this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
					numberOfBombs ++;
				}
			}
		})

		return numberOfBombs;
	}

	hasSafeTiles(){
		return this._numberOfTiles !== this._numberOfBombs
	}

	print(board) {

	  console.log(board.map(row => row.join(' | ')).join('\n'));
	}

	static generatePlayerBoard(numberOfRows, numberOfColumns) {
		let board = [];

		for(let i = 0; i < numberOfRows; i++){
			let row = [];

			for(let j = 0; j < numberOfColumns; j++){
			 row.push(' ');
			}

			board.push(row);
		}

		return board;
	}

	static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
		let board = [];

		for(let i = 0; i < numberOfRows; i++){
			let row = [];

			for(let j = 0; j < numberOfColumns; j++){
				row.push(null);
			}

			board.push(row);
		}

		let numberOfBombsPlaced = 0;

		while(numberOfBombsPlaced < numberOfBombs){
			let randomRowIndex = Math.floor(Math.random() * numberOfRows);
			let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
			if( board[randomRowIndex][randomColumnIndex] !== 'B'){
				board[randomRowIndex][randomColumnIndex] = 'B';	
				numberOfBombsPlaced ++;
			}
		}

		return board;


	}
} //class


const g = new Game(3,3,3);
g.playMove(0,0);


// const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
// 	let board = [];

// 	for(let i = 0; i < numberOfRows; i++){
// 		let row = [];

// 		for(let j = 0; j < numberOfColumns; j++){
// 			row.push(null);
// 		}

// 		board.push(row);
// 	}

// 	let numberOfBombsPlaced = 0;

// 	while(numberOfBombsPlaced < numberOfBombs){
// 		let randomRowIndex = Math.floor(Math.random() * numberOfRows);
// 		let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
// 		if( board[randomRowIndex][randomColumnIndex] !== 'B'){
// 			board[randomRowIndex][randomColumnIndex] = 'B';	
// 			numberOfBombsPlaced ++;
// 		}
// 	}

// 	return board;


// }

// const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
// 	const neighborOffsets = [
// 		[-1,-1],
// 		[-1,0],
// 		[-1,1],
// 		[0,-1],
// 		[0,1],
// 		[1,-1],
// 		[1,0],
// 		[1,1]
// 	];

// 	const numberOfRows = bombBoard.length;
// 	const numberOfColumns = bombBoard[0].length;
// 	let numberOfBombs = 0;

// 	neighborOffsets.forEach(offset => {
// 		const neighborRowIndex = rowIndex + offset[0];
// 		const neighborColumnIndex = columnIndex + offset[1];

// 		if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {

// 			if (bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
// 				numberOfBombs ++;
// 			}
// 		}
// 	})

// 	return numberOfBombs;
// }

// const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) =>
// {
// 	if (playerBoard[rowIndex][columnIndex] !== ' ') {
// 		console.log('This tile has already been flipped!');
// 		return
// 	}else if(bombBoard[rowIndex][columnIndex] === 'B') {
// 		playerBoard[rowIndex][columnIndex] = 'B';
// 	}else{
// 		playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
// 	}
// }

// const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
//   let board = [];

//   for(let i = 0; i < numberOfRows; i++){
//     let row = [];

//     for(let j = 0; j < numberOfColumns; j++){
//      row.push(' ');
//     }

//     board.push(row);
//   }

//   return board;
// }

// //console.log(generatePlayerBoard(2,3));

// print = board => {

//   console.log(board.map(row => row.join(' | ')).join('\n'));
// }

// let playerBoard = generatePlayerBoard(3,4);
// let bombBoard   = generateBombBoard(3,4,5)

// console.log('Player Board: ');
// printBoard(playerBoard);
// console.log('Bomb Board: ');
// printBoard(bombBoard);

// flipTile(playerBoard, bombBoard, 0, 0);
// console.log('Updated Player Board: ');
// printBoard(playerBoard);

// /////////////////

// // const printBoard = board => {
// //   console.log('Current Board:');
// //   console.log(board[0].join('|'));
// //   console.log(board[1].join('|'));
// //   console.log(board[2].join('|'));
// // }

// // const blankLine = ' | | ';
// // const guessLine = '1| | ';
// // const bombLine  = ' |B| ';

// // const board = [
// // 	[' ',' ',' '],
// // 	[' ',' ',' '],
// // 	[' ',' ',' ']
// // ];

// // printBoard(board);
// // board[0][1] = '1';
// // board[2][2] = 'B';
// // printBoard(board);

// //console.log('This is what an empty board would look like:');

// //console.log(blankLine);
// //console.log(blankLine);
// //console.log(blankLine);

// //console.log('This is what a board with a guess and a bomb on it would look like:');
// //console.log(guessLine);
// //console.log(bombLine);
// //console.log(blankLine);
