import bR from "./bR.png";
import wR from "./wR.png";

export const initialRook = {
    name: "rook",
    white: wR,
    black: bR,
    type: ["a8", "h8", "a1", "h1"],
    step: function (item, data, players) {
        let reverse = players === "black" ? "white" : "black";
        let placeholderStep = [];

        // up
        for (let i = 1; item.x + i <= 8; i++) {
            if (data[item.id - 8 * i]) {
                if (data[item.id - 8 * i]?.figure?.player === item.figure.player) {
                    break;
                } else if (data[item.id - 8 * i]?.figure?.player === reverse) {
                    placeholderStep.push(data[item.id - 8].y + data[item.id - 8 * i].x);
                    break;
                }
                placeholderStep.push(data[item.id - 8].y + data[item.id - 8 * i].x);
            } else {
                break;
            }
        }

        //right
        for (let i = 1; String.fromCharCode(item.y.charCodeAt(0) + i) <= "h"; i++) {
            if (data[item.id + i]) {
                if (data[item.id + i]?.figure?.player === item.figure.player) {
                    break;
                } else if (data[item.id + i]?.figure?.player === reverse) {
                    placeholderStep.push(data[item.id + i].y + data[item.id + i].x);
                    break;
                }
                placeholderStep.push(data[item.id + i].y + data[item.id + i].x);
            } else {
                break;
            }
        }
        //down
        for (let i = 1; item.x - i <= 8; i++) {
            if (data[item.id + 8 * i]) {
                if (data[item.id + 8 * i]?.figure?.player === item.figure.player) {
                    break;
                } else if (data[item.id + 8 * i]?.figure?.player === reverse) {
                    placeholderStep.push(data[item.id + 8].y + data[item.id + 8 * i].x);
                    break;
                }
                placeholderStep.push(data[item.id + 8].y + data[item.id + 8 * i].x);
            } else {
                break;
            }
        }
        //left
        for (let i = 1; String.fromCharCode(item.y.charCodeAt(0) - i) >= "a"; i++) {
            if (data[item.id - i]) {
                if (data[item.id - i]?.figure?.player === item.figure.player) {
                    break;
                } else if (data[item.id - i]?.figure?.player === reverse) {
                    placeholderStep.push(data[item.id - i].y + data[item.id - i].x);
                    break;
                }
                placeholderStep.push(data[item.id - i].y + data[item.id - i].x);
            } else {
                break;
            }
        }

        return placeholderStep;
    },
};
