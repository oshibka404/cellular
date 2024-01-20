import { getInitialState } from './getInitialState';

const width = 1920;
const height = 1080;
const pixelSize = 8;
const density = 0;

export const appState = {
    width,
    height,
    automaton: {
        initialState: getInitialState(Math.ceil(width / pixelSize), density),
        pixelSize: pixelSize,
        ruleNumber: 30,
        edges: 'loop',
        mainColor: '#000000',
        backgroundColor: '#FFFFFF',
        density,
    }
}
