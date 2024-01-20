const _width = 1920;
const _height = 1080;
const _pixelSize = 8;

const appState = {
    width: _width,
    height: _height,
    automaton: {
        initialState: getInitialState(Math.ceil(width / pixelSize)),
        pixelSize,
        ruleNumber: 30,
        edges: 'loop',
        mainColor: '#000000',
        backgroundColor: '#FFFFFF',
        density: 0,
    }
}
