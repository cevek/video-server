var fni = 1000;
var propsCount = 100;
function createFn() {
    var props = new Array(propsCount).fill(0).map(()=>`node.foo${(fni++).toString(33)} = "${(fni++).toString(31)}";`).join('\n');
    return (new Function(`
    var node = {}
    node.val = 1;
    ${props}
    return node;
    `))();
}

function createFnNew() {
    var props = new Array(propsCount).fill(0).map(()=>`this.foo${(fni++).toString(33)} = "${(fni++).toString(31)}";`).join('\n');
    return new(eval(`(function A${(fni++).toString(33)}(){
    this.val = 1;
    ${props}
    })`));
}

const size = 20;
var vals = new Array(size);
for (var i = 0; i < size; i++) {
    vals[i] = createFn();
}


function abc() {
    var last = 0;
    // var p = performance;
    console.time('perf');
    for (var i = 0; i < 1000000; i++) {
        // last = p.now();
        // last = p.now();
        var node = vals[i % size];
        last += sum(0, i, node) ? 1 : -1;
    }
    console.timeEnd('perf');
    return last;
}

function sum(a, b, node) {
    return a + b + node.val;
}

abc();
