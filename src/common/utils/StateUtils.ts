

export interface CommonState {
    left: number[],
    right: number[],
    number: number,
    start: number,
    time: number,
    bestTime: number,
    newRecord: boolean
}

export function defaultCommonState(mode: string): CommonState {
    return {
        left: [],
        right: [],
        number: -1,
        start: Date.now(),
        time: 0,
        bestTime: Number(window.localStorage.getItem(`${mode}.best`)) || 0,
        newRecord: false
    };
}