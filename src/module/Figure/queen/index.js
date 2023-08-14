import { initialBishop } from "../bishop";
import { initialRook } from "../rook";
import bQ from "./bQ.png";
import wQ from "./wQ.png";

export const initialQueen = {
    name: "queen",
    white: wQ,
    black: bQ,
    type: ["d8", "d1"],
    step: function (item, data, players) {
        return [...initialBishop.step(item, data, players), ...initialRook.step(item, data, players)];
    },
};
