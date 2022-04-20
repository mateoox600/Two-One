
function findState(dom: Element) {
    const key = Object.keys(dom).find(key => key.startsWith('__reactFiber$')) as keyof Element;
    if(!key) return undefined;

    const domFiber: any = dom[key];
    if (domFiber == null) return null;

    let parentFiber: any = domFiber.return;
    while(typeof parentFiber.type == 'string') parentFiber = parentFiber.return;
    return parentFiber.stateNode.state;
}

let acc = 0;
let i = 0;
setInterval(() => {
    const n = findState(document.getElementById('keep-alive') as Element).number;
    if(n != -1) [ ...document.querySelectorAll('.number') ].forEach((num) => {
        if(isNaN(Number(num.innerHTML)) || Number(num.innerHTML) != n) return;
        (num as HTMLElement).click();
        i++;
        if(i >= 1000) {
            i = 0;
            acc += i;
            console.log(acc);
        }
    });
}, 1);