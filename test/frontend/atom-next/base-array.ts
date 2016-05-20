import {Atom, AtomStatus, TaskType, Shared} from "./index";
import {prop, getAtomFieldName} from "./prop";
class BaseArrayServiceAtom extends Atom {
    constructor(owner: BaseArray<{}>){
        super();
        this.getter('index.array.service', owner, this.nothing);
        this.status = AtomStatus.GETTER;
    }

    protected nothing(){

    }

    protected updateCalc() {
        console.log("UpdateCalc");

        this.clearMasters();
        this.owner.clearIndex();
        return true;
    }

    addMaster(atom:BaseArrayServiceAtom) {
        if (!this.masters) {
            this.masters = [];
        }
        if (!atom.slaves) {
            atom.slaves = [];
        }
        this.masters.push(atom);
        atom.slaves.push(this);
    }
}

export class BaseArray<T> {
    protected indexAtom = new BaseArrayServiceAtom(this);

    @prop protected items:T[];

    get length() {
        return this.items.length;
    }

    constructor(items:T[]) {
        this.items = items || [];
    }

    protected getAtomCallback() {
        return this.items;
    }

    protected atom:Atom = Atom.getAtom(this.getAtomCallback, this);


    protected mutate() {
        this.atom.change();
        this.clearIndex();
    }

    protected index:{[key:string]:{[value:string]:BaseArray<T>}};

    clearIndex() {
        if (this.index) {
            console.log('clearIndex', this);
            this.index = null;
        }
    }

    protected createIndex(key:string) {
        console.log('createIndex', key);
        const keyIndex:{[value:string]:BaseArray<T>} = {};
        for (let i = 0; i < this.items.length; i++) {
            const item:any = this.items[i];
            if (item) {
                //todo: get raw atom if possible
                const atomProp = getAtomFieldName(key);
                const atom = item[atomProp];
                let itemVal:string;
                if (atom) {
                    this.indexAtom.addMaster(atom);
                    itemVal = atom.get();
                } else {
                    itemVal = item[key];
                }
                // this.indexAtom.startCapture();
                // this.indexAtom.stopCapture();
                if (itemVal) {
                    let keyIndexArray = keyIndex[itemVal];
                    if (!keyIndexArray) {
                        keyIndexArray = keyIndex[itemVal] = new BaseArray<T>([]);
                    }
                    keyIndexArray.push(item);
                }
            }
        }
        return keyIndex;
    }

    getBy(key:string, value:string | number) {
        this.indexAtom.get(); // need to subscribe when use
        if (!this.index) {
            this.index = {};
        }
        var indexKey = this.index[key];
        if (!indexKey) {
            indexKey = this.index[key] = this.createIndex(key);
        }
        let val = indexKey[value];
        if (!val) {
            val = indexKey[value] = new BaseArray<T>([]);
        }
        return val;
    }

    push(...items:T[]) {
        const result = this.items.push(...items);
        this.mutate();
        return result;
    }

    set(index:number, value:T) {
        this.items[index] = value;
        this.mutate();
    }

    get(index:number) {
        return this.items[index];
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

    splice(start:number, deleteCount?:number, ...items:T[]) {
        const result = this.items.splice(start, deleteCount, ...items);
        this.mutate();
        return result;

    }

    unshift(...items:T[]) {
        const result = this.items.unshift(...items);
        this.mutate();
        return result;

    }

    concat<U extends T[]>(...items:U[]):T[];
    concat(...items:T[]) {
        return this.items.concat(...items);
    }

    join(separator?:string) {
        return this.items.join(separator);
    }

    slice(start?:number, end?:number) {
        return this.items.slice(start, end);
    }

    indexOf(searchElement:T, fromIndex?:number) {
        return this.items.indexOf(searchElement, fromIndex);
    }

    lastIndexOf(searchElement:T, fromIndex?:number) {
        return this.items.lastIndexOf(searchElement, fromIndex);
    }

    every(callbackfn:(value:T, index:number, array:T[]) => boolean, thisArg?:any) {
        return this.items.every(callbackfn, thisArg);
    }

    some(callbackfn:(value:T, index:number, array:T[]) => boolean, thisArg?:any) {
        return this.items.some(callbackfn, thisArg);
    }

    forEach(callbackfn:(value:T, index:number, array:T[]) => void, thisArg?:any) {
        return this.items.forEach(callbackfn, thisArg);
    }

    map<U>(callbackfn:(value:T, index:number, array:T[]) => U, thisArg?:any) {
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
        </div>
    }
}

ReactDOM.render(<Comp/>, document.querySelector('#main'));*/
