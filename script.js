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

function generate() {
    const timer = performance.now()
    const width = parseInt(widthEl.value)
    const height = parseInt(heightEl.value)
    const pixelSize = parseInt(pixelsizeEl.value)
    
    canvasEl.width = width
    canvasEl.height = height

    const ruleNumber = parseInt(ruleEl.value, 10);

    drawAutomaton({
        ctx, 
        width,
        height,
        pixelSize,
        mainColor: colorEl.value,
        backgroundColor: backgroundEl.value,
        initialState: getInitialState(Math.ceil(width / pixelSize)),
        ruleNumber,
        edges: edgesEl.value,
    });

    document.getElementById('running-time').innerHTML = `Generated in ${performance.now() - timer}ms`
}

form.addEventListener('change' , generate)
form.addEventListener('submit', (e) => {
    e.preventDefault();
})
generateEl.addEventListener('click', generate);

generate();
