import {Atom} from "./index";
import {prop} from "./prop";

class KeyIndex<T> {
    constructor(protected key:string | number, protected source:ImmutableArray<T>) {}

    @prop get index() {
        const index:{[value: string]: ImmutableArray<T>} = {};
        for (var i = 0; i < this.source.length; i++) {
            const item = this.source.get(i);
            const value:string = (item as any)[this.key];
            let valueIndex = index[value];
            let items:T[];
            if (!valueIndex) {
                items = [];
                valueIndex = index[value] = new ImmutableArray(items);
            } else {
                items = (valueIndex as any).items;
            }
            items.push(item)
        }
        return index;
    }
}

export class ImmutableArray<T> {
    protected static emptyList = new ImmutableArray<{}>([]);

    protected items:T[];

    get length() {
        return this.items.length;
    }

    constructor(items:T[]) {
        this.items = items || [];
    }

    protected index: {[key: string]: KeyIndex<T>}

    getAllBy(key: string | number, value: string | number){
        if (!this.index) {
            this.index = {};
        }
        let keyIndex = this.index[key];
        if (!keyIndex) {
            keyIndex = this.index[key] = new KeyIndex(key, this);
        }
        let valueIndex = keyIndex.index[value];
        return valueIndex || ImmutableArray.emptyList as ImmutableArray<T>;
    }

    getBy(key: string | number, value: string | number){
        return this.getAllBy(key, value).items[0];
    }

    get(index:number) {
        return this.items[index];
    }

    concat<U extends T[]>(...items:U[]):T[];
    concat(...items:T[]): T[]
    concat() {
        return this.items.concat.apply(this.items, arguments);
    }

    join(separator?:string):string {
        return this.items.join(separator);
    }

    slice(start?:number, end?:number):T[] {
        return this.items.slice(start, end);
    }

    indexOf(searchElement:T, fromIndex?:number):number {
        return this.items.indexOf(searchElement, fromIndex);
    }

    lastIndexOf(searchElement:T, fromIndex?:number):number {
        return this.items.lastIndexOf(searchElement, fromIndex);
    }

    every(callbackfn:(value:T, index:number, array:T[]) => boolean, thisArg?:any):boolean {
        return this.items.every(callbackfn, thisArg);
    }

    some(callbackfn:(value:T, index:number, array:T[]) => boolean, thisArg?:any):boolean {
        return this.items.some(callbackfn, thisArg);
    }

    forEach(callbackfn:(value:T, index:number, array:T[]) => void, thisArg?:any):void {
        return this.items.forEach(callbackfn, thisArg);
    }

    map<U>(callbackfn:(value:T, index:number, array:T[]) => U, thisArg?:any):U[] {
        return this.items.map(callbackfn, thisArg);
    }

    filter(callbackfn:(value:T, index:number, array:T[]) => boolean, thisArg?:any) {
        return this.items.filter(callbackfn, thisArg);
    }

    reduce(callbackfn:(previousValue:T, currentValue:T, currentIndex:number, array:T[]) => T, initialValue?:T):T;
    reduce<U>(callbackfn:(previousValue:U, currentValue:T, currentIndex:number, array:T[]) => U, initialValue:U) {
        return this.items.reduce(callbackfn, initialValue);
    }

    reduceRight(callbackfn:(previousValue:T, currentValue:T, currentIndex:number, array:T[]) => T, initialValue?:T):T;
    reduceRight<U>(callbackfn:(previousValue:U, currentValue:T, currentIndex:number, array:T[]) => U, initialValue:U) {
        return this.items.reduceRight(callbackfn, initialValue);
    }

    toString() {
        return this.items.toString();
    }
}

export class AtomArray<T> extends ImmutableArray<T> {
    @prop protected items:T[];

    protected mutate() {
        this.items = Atom.forceUpdateValue;
    }

    push(...items:T[]): number;
    push(): number {
        const result = this.items.push.apply(this.items, arguments);
        this.mutate();
        return result;
    }

    set(index:number, value:T) {
        this.items[index] = value;
        this.mutate();
    }

    pop() {
        const result = this.items.pop();
        this.mutate();
        return result;
    }

    reverse() {
        const result = this.items.reverse();
        this.mutate();
        return result;
    }

    shift() {
        const result = this.items.shift();
        this.mutate();
        return result;
    }

    sort(compareFn?:(a:T, b:T) => number) {
        const result = this.items.sort(compareFn);
        this.mutate();
        return result;
    }

    splice(start:number, deleteCount?:number, ...items:T[]):T[]
    splice():T[] {
        const result = this.items.splice.apply(this.items, arguments);
        this.mutate();
        return result;

    }

    unshift(...items:T[]):number;
    unshift():number {
        const result = this.items.unshift.apply(this.items, arguments);
        this.mutate();
        return result;
    }
}


/*

 class X {
 @prop id:number;
 @prop name:string;
 @prop tid:number;

 constructor(id:number, name:string, tid:number) {
 this.id = id;
 this.name = name;
 this.tid = tid;
 }

 toString() {
 return `id: ${this.id}, name: ${this.name}, tid: ${this.tid}`;
 }
 }

 const arr = new BaseArray([
 new X(1, 'One', 100),
 new X(2, 'Two', 100),
 new X(3, 'Three', 200),
 new X(4, 'Four', 200),
 ]);

 window.X = X;

 window.arr = arr;

 @autowatch
 class Comp extends React.Component<{}, {}> {
 render() {
 return <div>
 {arr.getBy('tid', 100).map(item => <div>id: {item.id}, {item.name}, {item.tid}</div>)}
 {arr.getXBy('id', 3).map(item => <div>id: {item.id}, {item.name}, {item.tid}</div>)}
 </div>
 }
 }

 ReactDOM.render(<Comp/>, document.querySelector('#main'));*/
