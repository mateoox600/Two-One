
export interface CommonState {
    left: number[],
    right: number[],
    number: number,
    start: number,
    time: number,
    bestTime: number,
    newRecord: boolean
}

export interface Options {
    bestTimeIfNone: number
}

export function defaultCommonState(mode: string, options?: Partial<Options>): CommonState {
    return {
        left: [],
        right: [],
        number: -1,
        start: Date.now(),
        time: 0,
        bestTime: Number(window.localStorage.getItem(`${mode}.best`)) || options?.bestTimeIfNone || 0,
        newRecord: false
    };
}