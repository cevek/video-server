"use strict";

function hashAtom() {
    var id = 1;

    function Atom() {
        return {
            id: id++,
            slaves: {}
        }
    }

    var root = Atom();

    function deep(root, level) {
        for (var i = 0; i < 10; i++) {
            var atom = Atom();
            root.slaves[atom.id] = atom;
            if (level < 5) {
                deep(atom, level + 1);
            }
        }
    }

    deep(root, 0);

    function walk(atom) {
        for (var i in atom.slaves) {
            var slave = atom.slaves[i];
            if (slave) {
                walk(slave);
            }
        }
    }

    function find() {
        return root.slaves[root.id] = root;
    }

    console.time('hash');
    // walk(root);
    for (var i = 0; i < 1000000; i++) {
        find();
    }
    console.timeEnd('hash');
    console.log(id);
}

function arrayAtom() {
    var id = 1;

    function Atom() {
        return {
            id: id++,
            slaves: [],
            masters: [],
        }
    }

    var root = Atom();

    function deep(root, level) {
        for (var i = 0; i < 10; i++) {
            var atom = Atom();
            atom.masters.push(root);
            root.slaves.push(atom);
            if (level < 5) {
                deep(atom, level + 1);
            }
        }
    }

    deep(root, 0);

    function walk(atom) {
        for (var i = 0; i < atom.slaves.length; i++) {
            var master = atom.slaves[i];
            if (master == atom) {
                console.log(atom);
            }
        }
        for (var i = 0; i < atom.slaves.length; i++) {
            var slave = atom.slaves[i];
            walk(slave);
        }
    }

    function find() {
        for (var i = 0, len = root.slaves.length; i < len; i++) {
            var slave = root.slaves[i];
            if (slave === root) {
                return null;
            }
        }
        root.slaves.push(root);
    }

    console.time('array');
    // walk(root);
    for (var i = 0; i < 1000000; i++) {
        find();
    }
    console.timeEnd('array');
    console.log([root, id]);
}

// arrayAtom();
// hashAtom();

// function xxx() {

function abc(fn) {
    var name = getName(fn);
    console.time(name);
    for (var i = 0; i < 1000000; i++) {
        fn();
    }
    console.timeEnd(name);
}

function getName(fn) {
    return fn.name;
}

var obj = {};
var a = new Array(9999);
var k = 0;
for (var i = 0; i < a.length; i++) {
    a[i] = {task: null, atom: null, slave: null};
}

var pp = {k: 0};
function addTask(type, atom, slave) {
    var kk = pp.k % 9999;
    a[kk] = type;
    a[kk + 1] = atom;
    if (slave) {
        a[kk + 2] = slave;
    }
    // upTask();
    pp.k += 3;
}

function addTaskArr(task) {
    a[pp.k % 9999] = task;
    pp.k++;
}

function addTaskCache(type, atom, slave) {
    var task = a[pp.k % 9999];
    task.task = type;
    task.atom = atom;
    if (slave) {
        task.slave = slave;
    }
    pp.k++;
}

function upTask() {
    var kk = k % 9999;
    a[kk] = null;
    a[kk + 1] = null;
    a[kk + 2] = null;
}

function arr() {
    addTask(1, obj, null);
    for (var i = 0; i < 10; i++) {
        addTask(1, obj, obj);
    }
    addTask(1, obj, null);
}

function arrTask() {
    addTaskArr([1, obj, null]);
    for (var i = 0; i < 10; i++) {
        addTaskArr([1, obj, obj]);
    }
    addTaskArr([1, obj, null]);
}
function arrTaskObj() {
    addTaskArr({task: 1, atom: obj});
    for (var i = 0; i < 10; i++) {
        addTaskArr({task: 1, atom: obj, slave: obj});
    }
    addTaskArr({task: 1, atom: obj});
}

function arr2() {
    var aa = [];
    for (var i = 0; i < 10; i++) {
        aa.push(obj);
    }
    addTask(1, obj, aa);
}

// abc(arr2);
// abc(arr);
// abc(arrTask);
// abc(arrTaskObj);
// }
// xxx();


var heapSort = (function () {
    /*jshint bitwise: false*/

    return function (arr) {

        function siftdown(lower, upper) {
            var i = lower,
                c = lower,
                lastindex = upper >>> 1,
                temp = arr[i - 1];

            for (; c <= lastindex; i = c) {
                c = i << 1;
                if (c < upper && arr[c - 1] < arr[c]) {
                    ++c;
                }
                var arrcm1 = arr[c - 1];
                if (arrcm1 <= temp) {
                    break;
                }
                arr[i - 1] = arrcm1;
            }
            arr[i - 1] = temp;
        }

        var i, len = arr.length;
        for (i = len >>> 1; i > 0; i--) {
            siftdown(i, len);
        }
        for (i = len - 1; i > 0; i--) {
            var tmp = arr[0];
            arr[0] = arr[i];
            arr[i] = tmp;
            siftdown(1, i);
        }

        return arr;
    };
})();


function diffk(a, b, log) {
    var i, j, found, st = -1, aVal, bVal, aLen = a.length, bLen = b.length;
    for (i = 0; i < aLen; i++) {
        aVal = a[i];
        found = false;
        for (j = st + 1; j < bLen; j++) {
            if (a[i] === b[j]) {
                if (st === j - 1){
                    st = j;
                }
                found = true;
                break;
            }
        }
        if (!found) {
            remove(aVal, log);
        }
    }
    for (i = 0; i < bLen; i++) {
        bVal = b[i];
        found = false;
        for (j = 0; j < aLen; j++) {
            if (bVal === a[j]) {
                found = true;
                break;
            }
        }
        if (!found) {
            added(bVal, log);
        }
    }
    return st;
}


function remove(p, log) {
    if (log) {
        console.log('r', p);
    }
}
function added(p, log) {
    if (log) {
        console.log('a', p);
    }
}
function diff(vdom, old, log) {
    var newVal, oldVal, found, i, j;
    var newEnd = vdom.length;
    var oldEnd = old.length;
    var max = oldEnd > newEnd ? oldEnd : newEnd;
    for (i = 0; i < max; i++) {
        if (i < newEnd) {
            newVal = vdom[i];
        } else {
            newVal = null;
        }
        if (i < oldEnd) {
            oldVal = old[i];
        } else {
            oldVal = null;
        }
        if (newVal !== oldVal) {
            if (oldVal) {
                //check old is deleted
                found = false;
                for (j = 0; j < newEnd; j++) {
                    if (vdom[j] == oldVal) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    added(oldVal, log);
                }

            }
            if (newVal) {
                found = false;
                for (j = 0; j < oldEnd; j++) {
                    if (old[j] == newVal) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    remove(newVal, log);
                }
            }
        }
    }
}

var aa = [5, 3, 1, 8, 4, 9];
var bb = [3, 1, 5, 7, 2, 22];

function diff1() {
    diff(aa, bb);
}
function diff2() {
    diffk(aa, bb);
}


function heapSortC() {
    var a = [5, 3, 1, 8, 4, 9];
    heapSort(a);
}
abc(diff1)
abc(diff2)
// abc(heapSortC)


