import { memo, useCallback } from 'react';

//* Styles
import './style.css';

const Cell = memo(
	({ item, onClick }) => {
		const handleCellClick = useCallback(
			(ev) => {
				return onClick(item, ev);
			},
			[item, onClick]
		);

		return (
			<div
				className={`everyCell ${item.selected ? 'itemSelect' : ''}${item.placeholder && item.figure ? 'placeholderFigure' : ''} `}
				style={{ backgroundColor: `${item.color}` }}
				onClick={handleCellClick}>
				{item.placeholder && !item.figure && <div className='placeholder'></div>}
				{item.figure && (
					<img
						className='everyFigure'
						src={item.figure[item.figure.player]}
						alt='Figure'
					/>
				)}
			</div>
		);
	},
	(prev, next) => {
		if (prev.item !== next.item) {
			return false;
		} else {
			return true;
		}
	}
);

export default Cell;
