import bN from "./bN.png";
import wN from "./wN.png";

export const initialKnight = {
    name: "knight",
    white: wN,
    black: bN,
    type: ["b8", "g8", "b1", "g1"],
    step: function (item, data, players) {
        let reverse = players === "black" ? "white" : "black";
        let placeholderStep = [];

        //up
        if (data[item.id - 17] && data[item.id - 17]?.x === item.x + 2 && data[item.id - 17]?.figure?.player !== item.figure.player) {
            placeholderStep.push(data[item.id - 17].y + data[item.id - 17].x);
        }
        if (data[item.id - 15] && data[item.id - 15]?.x === item.x + 2 && data[item.id - 15]?.figure?.player !== item.figure.player) {
            placeholderStep.push(data[item.id - 15].y + data[item.id - 15].x);
        }
        if (data[item.id - 6] && data[item.id - 6]?.x === item.x + 1 && data[item.id - 6]?.figure?.player !== item.figure.player) {
            placeholderStep.push(data[item.id - 6].y + data[item.id - 6].x);
        }
        if (data[item.id - 10] && data[item.id - 10]?.x === item.x + 1 && data[item.id - 10]?.figure?.player !== item.figure.player) {
            placeholderStep.push(data[item.id - 10].y + data[item.id - 10].x);
        }
        //down
        if (data[item.id + 17] && data[item.id + 17]?.x === item.x - 2 && data[item.id + 17]?.figure?.player !== item.figure.player) {
            placeholderStep.push(data[item.id + 17].y + data[item.id + 17].x);
        }
        if (data[item.id + 15] && data[item.id + 15]?.x === item.x - 2 && data[item.id + 15]?.figure?.player !== item.figure.player) {
            placeholderStep.push(data[item.id + 15].y + data[item.id + 15].x);
        }
        if (data[item.id + 6] && data[item.id + 6]?.x === item.x - 1 && data[item.id + 6]?.figure?.player !== item.figure.player) {
            placeholderStep.push(data[item.id + 6].y + data[item.id + 6].x);
        }
        if (data[item.id + 10] && data[item.id + 10]?.x === item.x - 1 && data[item.id + 10]?.figure?.player !== item.figure.player) {
            placeholderStep.push(data[item.id + 10].y + data[item.id + 10].x);
        }
        // console.log(placeholderStep);

        return placeholderStep;
    },
};
