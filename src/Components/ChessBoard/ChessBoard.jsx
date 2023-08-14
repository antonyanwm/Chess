import React, { useState, useCallback, useMemo, useRef, memo } from "react";
import Cell from "../../module";
import { boardData } from "../../module/Board";
import "./style.css";
import { Board } from "../../module/CreateDeskFigure";

export let updateBoardFigureStep = [];
let initialPlayer = "white";
let coordinatesKing = null;

function kingStepAvialable(prevData) {
    updateBoardFigureStep = [];

    prevData.forEach((elem) => {
        if (elem?.figure?.player === (initialPlayer == "white" ? "black" : "white")) {
            updateBoardFigureStep.push(...elem.figure.step(elem, prevData, initialPlayer == "white" ? "black" : "white", true));
        }
        if (elem?.figure?.name === "king" && elem?.figure?.player == initialPlayer) {
            coordinatesKing = elem.y + elem.x;
        }
    });
    return prevData;
}

const ChessBoard = memo(() => {
    const [chessBoardData, setChessBoardData] = useState(boardData);

    const everyClick = useCallback(
        (item, ev) => {
            if (updateBoardFigureStep.includes(coordinatesKing)) {
                console.log("shax");
            } else {
                if (item.figure && item.figure.player == initialPlayer) {
                    setChessBoardData((prevData) => {
                        let step = item.figure.step(item, prevData, initialPlayer);

                        return prevData.map((elem) => {
                            if (elem.id === item.id) {
                                return { ...elem, selected: !elem.selected };
                            } else {
                                if (elem.selected === true) {
                                    return { ...elem, selected: false };
                                } else if (
                                    (!elem?.figure || elem?.figure?.player === (initialPlayer === "black" ? "white" : "black")) &&
                                    item.selected === false &&
                                    step.includes(elem.y + elem.x)
                                ) {
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
                        let nextStepTestKing = prevData.filter((el) => (el.selected === true ? el.figure : ""))[0].figure;
                        console.log(nextStepTestKing.step({ ...item, figure: nextStepTestKing }, prevData, initialPlayer, true));
                        initialPlayer === "black" ? (initialPlayer = "white") : (initialPlayer = "black");

                        return prevData.map((elem) => {
                            if (elem.selected === true) {
                                return { ...elem, figure: null, selected: false };
                            } else if (elem.id === item.id) {
                                return {
                                    ...elem,
                                    figure: { ...prevData.filter((el) => (el.selected === true ? el.figure : ""))[0].figure },
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
                    setChessBoardData((prevData) => {
                        return kingStepAvialable(prevData);
                    });
                } else {
                    console.log(coordinatesKing);
                    // console.log(updateBoardFigureStep);
                    console.log([...new Set(updateBoardFigureStep)]);
                    console.log(chessBoardData);
                }
            }
        },
        [chessBoardData]
    );

    const marker = ["a", "b", "c", "d", "e", "f", "g", "h"];

    return (
        <div className="ChessBoard">
            {console.log("render")}
            <div className="border">
                {chessBoardData.map((item) => {
                    return <Cell key={item.id} item={item} onClick={everyClick} />;
                })}
            </div>

            <div className="markerBottom">
                {marker.map((item, i) => (
                    <b key={i}>{item.toLocaleUpperCase()}</b>
                ))}
            </div>

            <div className="markerLeft">
                {marker.map((item, i) => (
                    <b key={i}>{7 - i + 1}</b>
                ))}
            </div>
        </div>
    );
});

export default ChessBoard;
