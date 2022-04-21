export function randomNumber() {
    return Math.floor(Math.random() * 8999 + 1000);
}
export function randomArray(size: number) {
    return new Array(size).fill(null).map(randomNumber);
}

let start = performance.now();
randomNumber();
console.log(`Number random one call: ${performance.now() - start}ms`);

const numbers: number[] = new Array(9).fill(0);
start = performance.now();
for (let i = 0; i < 1000000; i++) numbers[Math.floor(randomNumber() / 1000) - 1]++;
console.log(`Number random 1m call: ${performance.now() - start}ms`);
console.log(numbers);


start = performance.now();
randomArray(12);
console.log(`Array random length 12 one call: ${performance.now() - start}ms`);

start = performance.now();
for (let i = 0; i < 1000000; i++) randomArray(12);
console.log(`Array random length 12 1m call: ${performance.now() - start}ms`);
