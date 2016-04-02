let activeSlave:Atom;
let atomId = 0;

let debugAtoms:{[id:string]:boolean} = null;
(window as any).debugAtom = function (name:string) {
    if (!debugAtoms) {
        debugAtoms = {};
    }
    debugAtoms[name] = true;
};


function debug() {
    debugger;
}

const enum AtomStatus {
    CREATED = 1,
    INITED = 2,
    DESTROYED = -1,
}

export class Atom {
    private id = ++atomId;
    private slaves:{[id:number]:Atom};
    private masters:{[id:number]:Atom};
    private status:AtomStatus;
    field:string;
    value:any;
    owner:any;
    calcFn:()=>void;

    constructor(field:string, value:any, owner?:any, calcFn?:()=>void) {
        this.value = value;
        if (field) {
            this.field = field;
        }
        if (owner) {
            this.owner = owner;
        }
        this.calcFn = calcFn;
        this.status = AtomStatus.CREATED;
    }

    get() {
        if (activeSlave) {
            this.setSelfToActiveSlave()
        }
        if (this.calcFn && this.status == AtomStatus.CREATED) {
            this.calc();
            this.status = AtomStatus.INITED;
        }
        return this.value;
    }

    setSelfToActiveSlave() {
        if (!activeSlave.masters) {
            activeSlave.masters = {};
        }
        activeSlave.masters[this.id] = this;
        if (!this.slaves) {
            this.slaves = {};
        }
        this.slaves[activeSlave.id] = activeSlave;
    }


    set(value:any) {
        if (this.value !== value) {
            this.value = value;
            this.update();
        }

    }

    calc() {
        const oldActiveSlave = activeSlave;
        if (this.masters) {
            for (const id in this.masters) {
                this.masters[id] = null;
            }
        }
        activeSlave = this;
        const oldValue = this.value;
        this.value = this.calcFn.call(this.owner);
        activeSlave = oldActiveSlave;
        return oldValue !== this.value;
    }

    update() {
        const changed = this.calcFn ? this.calc() : true;
        if (changed) {
            if (debugAtoms && (debugAtoms[this.field] || debugAtoms[this.id])) {
                debug();
            }
            // console.info('update', this.field, this.value);
            if (this.slaves) {
                for (const id in this.slaves) {
                    const slave = this.slaves[id];
                    if (slave) {
                        this.slaves[id].update();
                    }
                }
            }
        }
    }

    destroy() {
        if (debugAtoms && (debugAtoms[this.field] || debugAtoms[this.id])) {
            debug();
        }
        if (this.masters) {
            for (const id in this.masters) {
                const master = this.masters[id];
                if (master) {
                    master.slaves[this.id] = null;
                }
                this.masters[id] = null;
            }
        }
        this.status = AtomStatus.DESTROYED;
        this.masters = null;
        this.slaves = null;
        this.value = null;
        this.owner = null;
    }

    static getAtom(callback:()=>void, thisArg?:any) {
        const oldActiveSlave = activeSlave;
        const myselfSlave = new Atom('getAtom', null);
        activeSlave = myselfSlave;
        callback.call(thisArg);
        activeSlave = oldActiveSlave;
        if (myselfSlave.masters) {
            for (const id in myselfSlave.masters) {
                return myselfSlave.masters[id];
            }
        }
        throw new Error('Atoms not found');
    }
}


export class BaseModel {

}

class ComponentAtom extends Atom {
    private cmp:any;

    constructor(cmp:any) {
        super(cmp.constructor.name, null, cmp, cmp.mainRender);
        this.cmp = cmp;
    }

    get() {
        if (activeSlave) {
            this.setSelfToActiveSlave()
        }
        this.calc();
        return this.value;
    }

    update() {
        this.cmp.forceUpdate();
    }
}

export const autowatch = function (cls:any) {
    cls.prototype.mainRender = cls.prototype.render;
    cls.prototype.shouldComponentUpdate = function () {
        return true;
    }
    cls.prototype.componentWillUnmount = function () {
        this.componentAtom.destroy();
    }
    cls.prototype.render = function () {
        return (this.componentAtom || (this.componentAtom = new ComponentAtom(this))).get();
    }
}

export var prop:any = function (proto:any, prop:string, descriptor?:PropertyDescriptor) {
    var _prop = ('_' + prop).substr(0);
    const fieldName = proto.constructor.name + '.' + prop;
    // const descriptor = Object.getOwnPropertyDescriptor(proto, prop);
    if (descriptor && descriptor.get) {
        return {
            set: void 0,
            get: function () {
                return ((this[_prop] || (this[_prop] = new Atom(fieldName, void 0, this, descriptor.get))) as Atom).get();
            }
        }
    }

    return {
        set: function (value:any) {
            var atom:Atom = this[_prop];
            if (atom) {
                atom.set(value);
            }
            else {
                this[_prop] = new Atom(fieldName, value);
            }
        },
        get: function () {
            return ((this[_prop] || (this[_prop] = new Atom(fieldName, void 0))) as Atom).get();
        }
    }
};

export class BaseArray<T> {
    @prop protected items:T[] = [];

    @prop get length() {
        return this.items.length;
    }

    private getAtomCallback() {
        return this.items;
    }

    private atom:Atom = Atom.getAtom(this.getAtomCallback, this);


    private mutate() {
        this.atom.update();
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

