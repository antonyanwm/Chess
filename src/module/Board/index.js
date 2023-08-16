//* Components
import { colorBoard } from '../Color/index.js';
import { Board } from '../CreateDeskFigure/index.js';
import { initialBishop } from '../Figure/bishop/index.js';
import { initialKing } from '../Figure/king/index.js';
import { initialKnight } from '../Figure/knight/index.js';
import { initialPawns } from '../Figure/pawns/index.js';
import { initialQueen } from '../Figure/queen/index.js';
import { initialRook } from '../Figure/rook/index.js';

export const boardData = [];

const obj = {
	0: 'a',
	1: 'b',
	2: 'c',
	3: 'd',
	4: 'e',
	5: 'f',
	6: 'g',
	7: 'h',
};

let zero = 0;
const objFigure = [initialBishop, initialKing, initialKnight, initialPawns, initialQueen, initialRook];

function board() {
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
			boardData.push(
				new Board(
					8 - i,
					obj[j],
					(i + j) % 2 == 0 ? colorBoard.white : colorBoard.black,
					i >= 4 ? 'A' : 'B',
					// i + "" + j,
					zero++,
					...objFigure.filter((item) => item.type.includes(obj[j] + (8 - i))).map(({ type, ...item }) => ({ ...item, player: i >= 4 ? 'white' : 'black' }))
				)
			);
		}
	}
}
board();
