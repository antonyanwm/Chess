import { updateBoardFigureStep } from "../../../Components/ChessBoard/ChessBoard";
import bK from "./bK.png";
import wK from "./wK.png";

export const initialKing = {
    name: "king",
    white: wK,
    black: bK,
    type: ["e8", "e1"],
    step: function (item, data, players) {
        let reverse = players === "black" ? "white" : "black";
        let placeholderStep = [];

        for (let i = 0; i < 3; i++) {
            //up
            if (
                data[item.id - 7 - i] &&
                data[item.id - 7 - i]?.figure?.player !== item.figure.player &&
                (data[item.id - 7 - i]?.y === String.fromCharCode(item.y.charCodeAt(0) - 1) ||
                    data[item.id - 7 - i]?.y === String.fromCharCode(item.y.charCodeAt(0) + 1) ||
                    data[item.id - 7 - i]?.y === String.fromCharCode(item.y.charCodeAt(0)))
            ) {
                placeholderStep.push(data[item.id - 7 - i].y + data[item.id - 7 - i].x);
            }
            //down
            if (
                data[item.id + 7 + i] &&
                data[item.id + 7 + i]?.figure?.player !== item.figure.player &&
                (data[item.id + 7 + i]?.y === String.fromCharCode(item.y.charCodeAt(0) - 1) ||
                    data[item.id + 7 + i]?.y === String.fromCharCode(item.y.charCodeAt(0) + 1) ||
                    data[item.id + 7 + i]?.y === String.fromCharCode(item.y.charCodeAt(0)))
            ) {
                placeholderStep.push(data[item.id + 7 + i].y + data[item.id + 7 + i].x);
            }
        }
        //left
        if (
            data[item.id + 1] &&
            data[item.id + 1]?.figure?.player !== item.figure.player &&
            data[item.id + 1]?.y === String.fromCharCode(item.y.charCodeAt(0) + 1)
        ) {
            placeholderStep.push(data[item.id + 1].y + data[item.id + 1].x);
        }
        //right
        if (
            data[item.id - 1] &&
            data[item.id - 1]?.figure?.player !== item.figure.player &&
            data[item.id - 1]?.y === String.fromCharCode(item.y.charCodeAt(0) - 1)
        ) {
            placeholderStep.push(data[item.id - 1].y + data[item.id - 1].x);
        }

        return placeholderStep.filter((item) => {
            return !updateBoardFigureStep.includes(item);
        });
    },
};
