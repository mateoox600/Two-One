"use strict";
function findState(dom) {
    const key = Object.keys(dom).find(key => key.startsWith('__reactFiber$'));
    if (!key)
        return undefined;
    const domFiber = dom[key];
    if (domFiber == null)
        return null;
    let parentFiber = domFiber.return;
    while (typeof parentFiber.type == 'string')
        parentFiber = parentFiber.return;
    return parentFiber.stateNode.state;
}
let acc = 0;
let i = 0;
setInterval(() => {
    const n = findState(document.getElementById('keep-alive')).number;
    if (n != -1)
        [...document.querySelectorAll('.number')].forEach((num) => {
            if (isNaN(Number(num.innerHTML)) || Number(num.innerHTML) != n)
                return;
            num.click();
            i++;
            if (i >= 1000) {
                i = 0;
                acc += i;
                console.log(acc);
            }
        });
}, 1);
//# sourceMappingURL=KeepAliveCheatTest.js.map