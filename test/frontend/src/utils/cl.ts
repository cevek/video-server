export function classes(...args:(string | number | boolean)[]) {
    var classes:string[] = [];
    if (args.length % 2 == 1) {
        throw new Error('Incorrect className items');
    }
    for (var i = 0; i < args.length; i += 2) {
        if (args[i + 1]) {
            classes.push(args[i] as string);
        }
    }
    return classes.join(' ');
}