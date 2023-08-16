//* Images
import bP from './bP.png';
import wP from './wP.png';

export const initialPawns = {
	name: 'pawns',
	white: wP,
	black: bP,
	type: ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7', 'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],

	step: function (item, data, players, state) {
		let placeholderStep = [];
		let stateData = [];
		//! black Pawns
		if (item.figure.player === 'black') {
			//! down
			if (initialPawns.type.includes(item.y + item.x) && data[item.id + 16] && !data[item.id + 8]?.figure && !data[item.id + 16]?.figure) {
				placeholderStep.push(data[item.id + 16].y + data[item.id + 16].x);
			}
			if (data[item.id + 8] && !data[item.id + 8]?.figure) {
				placeholderStep.push(data[item.id + 8].y + data[item.id + 8].x);
			}
			//! down left
			if (data[item.id + 7]?.figure?.player == 'white' && data[item.id + 7]?.x === item.x - 1) {
				placeholderStep.push(data[item.id + 7].y + data[item.id + 7].x);
			}
			//! down right
			if (data[item.id + 9]?.figure?.player == 'white' && data[item.id + 9]?.x === item.x - 1) {
				placeholderStep.push(data[item.id + 9].y + data[item.id + 9].x);
			}
		} else {
			//! down
			if (initialPawns.type.includes(item.y + item.x) && data[item.id - 16] && !data[item.id - 8]?.figure && !data[item.id - 16]?.figure) {
				placeholderStep.push(data[item.id - 16].y + data[item.id - 16].x);
			}
			if (data[item.id - 8] && !data[item.id - 8]?.figure) {
				placeholderStep.push(data[item.id - 8].y + data[item.id - 8].x);
			}
			//! down left
			if (data[item.id - 7]?.figure?.player == 'black' && data[item.id - 7]?.x === item.x + 1) {
				placeholderStep.push(data[item.id - 7].y + data[item.id - 7].x);
			}
			//! down right
			if (data[item.id - 9]?.figure?.player == 'black' && data[item.id - 9]?.x === item.x + 1) {
				placeholderStep.push(data[item.id - 9].y + data[item.id - 9].x);
			}
		}
		if (state) {
			if (players === 'black') {
				if (data[item.id + 7]?.x === item.x - 1) {
					stateData.push(data[item.id + 7].y + data[item.id + 7].x);
				}
				if (data[item.id + 9]?.x === item.x - 1) {
					stateData.push(data[item.id + 9].y + data[item.id + 9].x);
				}
			} else {
				if (data[item.id - 7]?.x === item.x + 1) {
					stateData.push(data[item.id - 7].y + data[item.id - 7].x);
				}
				//! down right
				if (data[item.id - 9]?.x === item.x + 1) {
					stateData.push(data[item.id - 9].y + data[item.id - 9].x);
				}
			}
			return stateData;
		} else {
			return placeholderStep;
		}
	},
};
