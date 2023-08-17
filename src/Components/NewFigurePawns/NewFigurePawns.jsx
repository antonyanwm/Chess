import React from "react";
import "./style.css";
import { initialQueen } from "../../module/Figure/queen";
import { initialKnight } from "../../module/Figure/knight";
import { initialBishop } from "../../module/Figure/bishop";
import { initialRook } from "../../module/Figure/rook";

function NewFigurePawns(props) {
    let setAllData = props.setAllData;
    let thisItem = props.pawnsFigure;
    function selectNewFigure({ type, ...elem }) {
        setAllData((prevData) => {
            return prevData.map((item) => {
                if (item.id === thisItem.id) {
                    return {
                        ...item,
                        figure: {
                            ...elem,
                            player: item.figure.player,
                        },
                    };
                } else {
                    return item;
                }
            });
        });
    }

    return (
        <div className="NewFigurePawns">
            <div className="selectNewFigure">
                {[initialQueen, initialKnight, initialBishop, initialRook].map((item, i) => {
                    return (
                        <img
                            onClick={selectNewFigure.bind(this, item)}
                            key={i}
                            className="everyImageSelect"
                            src={item[thisItem.figure.player]}
                            alt="imageFigure"
                        />
                    );
                })}
            </div>
        </div>
    );
}
export default NewFigurePawns;
