import { shuffle } from './ArrayUtils';
import { randomArray, randomNumber } from './RandomUtils';

export interface Options {
    bestTimeIfNone: number;
}

export class Gamemode {
    left: number[] = [];
    right: number[] = [];
    pickedNumber = -1;
    start: number = Date.now();
    time = 0;
    newRecord = false;
    bestTime: number;

    constructor(mode: string, options?: Partial<Options>) {
        this.bestTime = Number(window.localStorage.getItem(`${mode}.best`)) || options?.bestTimeIfNone || 0;
        this.time = this.bestTime;
    }

    startGame(...a: unknown[]): void {
        throw new Error('Method not implemented.');
    }

    endGame(...a: unknown[]): void {
        throw new Error('Method not implemented.');
    }

    newListsAndNumber(): void {
        const numbers = new Set(randomArray(23));

        while (numbers.size < 23) { numbers.add(randomNumber()); }

        const idx = Math.floor(Math.random() * 12);
        const left = shuffle(Array.from(numbers).splice(0, 12));
        const pickedNumber = left[idx];
        const right = shuffle(Array.from(numbers).splice(12).concat([ pickedNumber ]));

        this.left = left;
        this.right = right;
        this.pickedNumber = pickedNumber;
    }

    reset(): void {
        this.newListsAndNumber();
        this.start = Date.now();
        this.time = 0;
        this.newRecord = false;
    }
}
