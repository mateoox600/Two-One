
export function randomArray(size: number) {
    return new Array(size).fill(null).map(randomNumber);
}

export function randomNumber() {
    return Math.floor(Math.random() * 8999 + 1000);
}