const canvasEl = document.getElementById('canvas');
const widthEl = document.getElementById('width');
const heightEl = document.getElementById('height');
const ruleEl = document.getElementById('rule');
const edgesEl = document.getElementById('edges');
const pixelsizeEl = document.getElementById('pixelsize');
const colorEl = document.getElementById('color');
const backgroundEl = document.getElementById('background');
const generateEl = document.getElementById('generate');
const densityEl = document.getElementById('density');
const form = document.getElementById('form');

const ctx = canvasEl.getContext('2d');

const getInitialState = (size) => {
    const density = parseFloat(densityEl.value)
    
    const state = new Array(size).fill(0).map(() => Math.random() < density ? 1 : 0);
    
    if (density === 0) {
        state[Math.floor(size / 2)] = 1;
    }
    return state;
}

function drawGeneration(state, i, ctx, pixelSize, color, bgColor) {
    for (let j = 0; j < state.length; j++) {
        if (state[j]) {
            ctx.fillStyle = color;
        } else {
            ctx.fillStyle = bgColor;
        }
        ctx.fillRect(j * pixelSize, i * pixelSize, pixelSize, pixelSize);
    }
}

function updateState(prevState, ruleString) {
    const nextState = [];
    for (let j = 0; j < prevState.length; j++) {
        const left = j === 0 ? getEdgeCellState(true, prevState) : prevState[j - 1] || 0;
        const right = j === prevState.length - 1 ? getEdgeCellState(false, prevState) : prevState[j + 1] || 0;
        const center = prevState[j];

        const rule = (left << 2) + (center << 1) + right; // 0-7
        const newStateBit = parseInt(ruleString[7-rule], 10);
        nextState.push(newStateBit);
    }
    return nextState;
}

function generate() {
    const timer = performance.now()
    const width = parseInt(widthEl.value)
    const height = parseInt(heightEl.value)
    const pixelSize = parseInt(pixelsizeEl.value)
    
    canvasEl.width = width
    canvasEl.height = height

    const ruleString = parseInt(ruleEl.value, 10).toString(2).padStart(8, '0');

    let state = getInitialState(Math.ceil(width / pixelSize));

    for (let i = 0; i < height / pixelSize; i++) {
        drawGeneration(state, i, ctx, pixelSize, colorEl.value, backgroundEl.value);
        state = updateState(state, ruleString);
    }

    document.getElementById('running-time').innerHTML = `Generated in ${performance.now() - timer}ms`
}

const getEdgeCellState = (isLeft, state) => {
    const edges = edgesEl.value
    if (edges === 'dead') {
        return 0;
    } else if (edges === 'alive') {
        return 1;
    } else if (edges === 'density') {
        const density = parseFloat(densityEl.value)
        return Math.random() < density ? 1 : 0;
    } else if (edges === 'random') {
        return Math.round(Math.random())
    } else if (edges === 'loop') {
        return isLeft ? state[state.length - 1] : state[0]
    } else {
        return Math.round(Math.random())
    }
}

form.addEventListener('change' , generate)
form.addEventListener('submit', (e) => {
    e.preventDefault();
})
generateEl.addEventListener('click', generate);

generate();
