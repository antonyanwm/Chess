import { useState, useCallback, memo } from 'react';

//* Modules
import Cell from '../../module';
import { boardData } from '../../module/Board';
import { Board } from '../../module/CreateDeskFigure';

//* Components
import { availableStepNoKingAttacked } from '../../Engine/EngineChessTwoPlayers';

//* Styles
import './style.css';

const ChessBoard = memo(() => {
	//! Initial values
	let initialPlayer = 'white';
	const marker = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

	//! State
	const [chessBoardData, setChessBoardData] = useState(boardData);

	const everyClick = useCallback(
		(item, ev) => {
			if (item.figure && item.figure.player == initialPlayer) {
				setChessBoardData((prevData) => {
					let step = item.figure.step(item, prevData, initialPlayer);
					let newStep = availableStepNoKingAttacked(prevData, step, item, initialPlayer);
					step = newStep ?? step;

					return prevData.map((elem) => {
						if (elem.id === item.id) {
							return { ...elem, selected: !elem.selected };
						} else {
							if (elem.selected === true) {
								return { ...elem, selected: false };
							} else if ((!elem?.figure || elem?.figure?.player === (initialPlayer === 'black' ? 'white' : 'black')) && item.selected === false && step.includes(elem.y + elem.x)) {
								return new Board(...Object.values({ ...elem, placeholder: true }));
							} else if (elem.placeholder === true) {
								return new Board(...Object.values({ ...elem, placeholder: false }));
							}
							return elem;
						}
					});
				});
			} else if (item.placeholder) {
				setChessBoardData((prevData) => {
					initialPlayer === 'black' ? (initialPlayer = 'white') : (initialPlayer = 'black');

					return prevData.map((elem) => {
						if (elem.selected === true) {
							return { ...elem, figure: null, selected: false };
						} else if (elem.id === item.id) {
							return {
								...elem,
								figure: { ...prevData.filter((el) => (el.selected === true ? el.figure : ''))[0].figure },
								placeholder: false,
							};
						} else {
							if (elem.placeholder === true) {
								return { ...elem, placeholder: false };
							}
							return elem;
						}
					});
				});
				// setChessBoardData((prevData) => {
				//     return kingStepAvialable(prevData);
				// });
			} else {
			}
		},
		[chessBoardData]
	);

	return (
		<div className='ChessBoard'>
			{console.log('render')}
			<div className='border'>
				{chessBoardData.map((item) => {
					return (
						<Cell
							key={item.id}
							item={item}
							onClick={everyClick}
						/>
					);
				})}
			</div>

			<div className='markerBottom'>
				{marker.map((item, i) => (
					<b key={i}>{item.toLocaleUpperCase()}</b>
				))}
			</div>

			<div className='markerLeft'>
				{marker.map((item, i) => (
					<b key={i}>{7 - i + 1}</b>
				))}
			</div>
		</div>
	);
});

export default ChessBoard;
