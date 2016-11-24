function abc() {
    console.time('perf');
    var last;
    var p = process;
    for (var i = 0; i < 1000000; i++) {
        last = p.hrtime();
//            last = Date.now();
    }
    console.timeEnd('perf');
    return last;
}
abc();
