import { randomArray, randomNumber } from './RandomUtils';
import { shuffle } from './ArrayUtils';

export function getNewListsAndNumber(): { left: number[], right: number[], number: number } {

    const numbers = new Set(randomArray(23));

    while(numbers.size < 23) numbers.add(randomNumber());

    const idx = Math.floor(Math.random() * 12);
    const left = shuffle(Array.from(numbers).splice(0, 12));
    const number = left[idx];
    const right = shuffle(Array.from(numbers).splice(12).concat([ number ]));

    return {
        left,
        right,
        number
    };
}