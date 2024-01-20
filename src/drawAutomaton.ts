import { AutomatonProps, Edges } from "./types";

const getEdgeCellState = (edges: Edges, isLeft: boolean, state: number[]) => {
    if (edges === 'dead') {
        return 0;
    } else if (edges === 'alive') {
        return 1;
    } else if (edges === 'random') {
        return Math.round(Math.random())
    } else if (edges === 'loop') {
        return isLeft ? state[state.length - 1] : state[0]
    } else {
        return Math.round(Math.random())
    }
}

function drawGeneration(state: number[], i: number, ctx: CanvasRenderingContext2D, pixelSize: number, color: string) {
    ctx.fillStyle = color;
    const y = i * pixelSize
    for (let j = 0; j < state.length; j++) {
        if (state[j]) {
            ctx.fillRect(j * pixelSize, y, pixelSize, pixelSize);
        }
    }
}

function updateState(prevState: number[], ruleNumber: number, edges: Edges) {
    const nextState: number[] = [];
    for (let j = 0; j < prevState.length; j++) {
        const left = j === 0 ? getEdgeCellState(edges, true, prevState) : prevState[j - 1] || 0;
        const center = prevState[j];
        const right = j === prevState.length - 1 ? getEdgeCellState(edges, false, prevState) : prevState[j + 1] || 0;

        const rule = (left << 2) + (center << 1) + right; // 0-7
        const newStateBit = (ruleNumber >> rule) % 2;
        nextState.push(newStateBit);
    }
    return nextState;
}

export function drawAutomaton({
    ctx, 
    width,
    height,
    pixelSize,
    mainColor,
    backgroundColor,
    initialState,
    ruleNumber,
    edges,
}: AutomatonProps) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height)

    let state = initialState

    for (let i = 0; i < height / pixelSize; i++) {
        drawGeneration(state, i, ctx, pixelSize, mainColor);
        state = updateState(state, ruleNumber, edges);
    }
}