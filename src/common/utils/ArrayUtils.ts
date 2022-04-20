

export function arrayContainArrayElement(array1: number[], array2: number[]) {
    let result = false;
    array1.forEach((n1) => {
        array2.forEach((n2) => {
            if(n1 == n2) result = true;
        });
    });
    return result;
}

export function arrayContainElement(number: number, array: number[]) {
    let result = false;
    array.forEach((n) => {
        if(n == number) result = true;
    });
    return result;
}