import { randomArray, randomNumber } from './RandomUtils';
import { arrayContainArrayElement, arrayContainElement } from './ArrayUtils';

export function getNewListsAndNumber(): { left: number[], right: number[], number: number } {
    let left = randomArray(12);
    let right = randomArray(12);

    while(arrayContainArrayElement(left, right)) {
        left = randomArray(12);
        right = randomArray(12);
    }

    let number = randomNumber();

    while(arrayContainElement(number, [ ...left, ...right ])) number = randomNumber();

    const posLeft = Math.floor(Math.random() * 12);
    const posRight = Math.floor(Math.random() * 12);

    left[posLeft] = number;
    right[posRight] = number;

    return { left, right, number };
}