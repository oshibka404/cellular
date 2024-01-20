export const getInitialState = (size: number, density: number) => {
    const state = new Array(size).fill(0).map(() => Math.random() < density ? 1 : 0);
    
    if (density === 0) {
        state[Math.floor(size / 2)] = 1;
    }
    return state;
}