export class Board {
	constructor(x, y, color, sector, id, figure, available, selected, placeholder) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.sector = sector;
		this.id = id;
		this.figure = figure || null;
		this.available = available || false;
		this.selected = selected || false;
		this.placeholder = placeholder || false;
	}
}
