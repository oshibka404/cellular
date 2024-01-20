import { drawAutomaton } from "./drawAutomaton";
import { AutomatonProps, Edges } from "./types";
import { getInitialState } from './getInitialState';

export const widthEl = document.getElementById('width') as HTMLInputElement;
export const heightEl = document.getElementById('height') as HTMLInputElement;
export const ruleEl = document.getElementById('rule') as HTMLInputElement;
export const edgesEl = document.getElementById('edges') as HTMLInputElement;
export const pixelsizeEl = document.getElementById('pixelsize') as HTMLInputElement;
export const colorEl = document.getElementById('color') as HTMLInputElement;
export const backgroundEl = document.getElementById('background') as HTMLInputElement;
export const densityEl = document.getElementById('density') as HTMLInputElement;
export const form = document.getElementById('form') as HTMLFormElement;

const canvasEl = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D;

export function updateForm({
    width,
    height,
    ruleNumber,
    edges,
    pixelSize,
    mainColor,
    backgroundColor,
    density,
}: AutomatonProps) {
    widthEl.value = width.toString();
    heightEl.value = height.toString();
    ruleEl.value = ruleNumber.toString();
    edgesEl.value = edges;
    pixelsizeEl.value = pixelSize.toString();
    colorEl.value = mainColor;
    backgroundEl.value = backgroundColor;
    densityEl.value = density.toString();
}

export function generate() {
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
        initialState: getInitialState(Math.ceil(width / pixelSize), parseFloat(densityEl.value)),
        ruleNumber,
        edges: edgesEl.value as Edges,
        density: parseFloat(densityEl.value),
    });

    document.getElementById('running-time')!.innerHTML = `Generated in ${performance.now() - timer}ms`
}

form.addEventListener('change' , generate)
form.addEventListener('submit', (e) => {
    e.preventDefault();
    generate();
})
