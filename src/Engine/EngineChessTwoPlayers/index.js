// this file filters all possible moves that are possible according to the rules of chess

export function kingStepAvailable(prevData, initialPlayer) {
    let updateBoardFigureStep = [];
    let coordinatesKing = null;
    let push = {};
    prevData.forEach((elem) => {
        if (elem?.figure?.player === (initialPlayer == "white" ? "black" : "white")) {
            updateBoardFigureStep.push(...elem.figure.step(elem, prevData, initialPlayer == "white" ? "black" : "white", true));
        }
        if (elem?.figure?.name === "king" && elem?.figure?.player == initialPlayer) {
            coordinatesKing = elem.y + elem.x;
        }
    });
    updateBoardFigureStep = [...new Set(updateBoardFigureStep)];
    push = {
        updateBoardFigureStep,
        coordinatesKing,
    };
    return push;
}
export function availableStepNoKingAttacked(prevData, step, item, initialPlayer) {
    let updateBoardFigureStep = [];
    let coordinatesKing = null;
    let newStep = step;
    step.forEach((e, i) => {
        let newBoardNextStep = prevData.map((elem) => {
            if (item.id === elem.id) {
                return { ...item, figure: null };
            }
            if (elem.y + elem.x == step[i]) {
                return { ...elem, figure: { ...item.figure } };
            }
            return elem;
        });
        let allAndKingStep = kingStepAvailable(newBoardNextStep, initialPlayer);

        updateBoardFigureStep = allAndKingStep.updateBoardFigureStep;
        coordinatesKing = allAndKingStep.coordinatesKing;

        if (updateBoardFigureStep.includes(coordinatesKing)) {
            newStep = newStep.filter((el) => {
                return el !== step[i];
            });
        }
        updateBoardFigureStep = [];
        coordinatesKing = null;
    });
    return newStep;
}
