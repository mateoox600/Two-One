
export function randomArray(size: number): number[] {
    return new Array(size).fill(null).map(randomNumber);
}

export function randomNumber(): number {
    return Math.floor(Math.random() * 8999 + 1000);
}
