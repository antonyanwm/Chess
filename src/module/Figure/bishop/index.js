import bB from "./bB.png";
import wB from "./wB.png";

export const initialBishop = {
    name: "bishop",
    white: wB,
    black: bB,
    type: ["c8", "f8", "c1", "f1"],
    step: function (item, data, players) {
        let reverse = players === "black" ? "white" : "black";
        let placeholderStep = [];

        //left up
        for (let i = 1; String.fromCharCode(item.y.charCodeAt(0) - i) >= "a" && item.x + i <= 8; i++) {
            if (data[item.id - 9 * i]) {
                if (data[item.id - 9 * i]?.figure?.player === item.figure.player) {
                    break;
                } else if (data[item.id - 9 * i]?.figure?.player === reverse) {
                    placeholderStep.push(data[item.id - 9 * i].y + data[item.id - 9 * i].x);
                    break;
                }
                placeholderStep.push(data[item.id - 9 * i].y + data[item.id - 9 * i].x);
            } else {
                break;
            }
        }

        //right up
        for (let i = 1; String.fromCharCode(item.y.charCodeAt(0) + i) <= "h" && item.x + i <= 8; i++) {
            if (data[item.id - 7 * i]) {
                if (data[item.id - 7 * i]?.figure?.player === item.figure.player) {
                    break;
                } else if (data[item.id - 7 * i]?.figure?.player === reverse) {
                    placeholderStep.push(data[item.id - 7 * i].y + data[item.id - 7 * i].x);
                    break;
                }
                placeholderStep.push(data[item.id - 7 * i].y + data[item.id - 7 * i].x);
            } else {
                break;
            }
        }
        //left bottom
        for (let i = 1; String.fromCharCode(item.y.charCodeAt(0) - i) >= "a" && item.x - i <= 8; i++) {
            if (data[item.id + 7 * i]) {
                if (data[item.id + 7 * i]?.figure?.player === item.figure.player) {
                    break;
                } else if (data[item.id + 7 * i]?.figure?.player === reverse) {
                    placeholderStep.push(data[item.id + 7 * i].y + data[item.id + 7 * i].x);
                    break;
                }
                placeholderStep.push(data[item.id + 7 * i].y + data[item.id + 7 * i].x);
            } else {
                break;
            }
        }
        //right bottom
        for (let i = 1; String.fromCharCode(item.y.charCodeAt(0) + i) <= "h" && item.x - i <= 8; i++) {
            if (data[item.id + 9 * i]) {
                if (data[item.id + 9 * i]?.figure?.player === item.figure.player) {
                    break;
                } else if (data[item.id + 9 * i]?.figure?.player === reverse) {
                    placeholderStep.push(data[item.id + 9 * i].y + data[item.id + 9 * i].x);
                    break;
                }
                placeholderStep.push(data[item.id + 9 * i].y + data[item.id + 9 * i].x);
            } else {
                break;
            }
        }

        return placeholderStep;
    },
};
