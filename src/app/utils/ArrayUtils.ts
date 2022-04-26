
export function shuffle<T extends unknown[]>(array: T): T {
    for (let i = 0; i < array.length * 2; i++) { array = array.sort(() => Math.random() - Math.random()); }
    return array;
}
