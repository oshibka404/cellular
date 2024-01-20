export type Edges = 'dead' | 'alive' | 'density' | 'random' | 'loop'
export type AutomatonProps = {
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    pixelSize: number,
    mainColor: string,
    backgroundColor: string,
    initialState: number[],
    ruleNumber: number,
    edges: Edges,
    density: number,
}
