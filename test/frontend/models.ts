let activeSlave:Atom;
let lastGetted:Atom;
let autoMasters = true;
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

const enum AtomAffectStatus{
    NEEDCALC = 1,
    CALC = 5,
    NEEDNOT_CALC = 10,
    WAIT_PARENT_CALC = 30,
}

const enum TaskType{
    CHANGE = 10,
    CLEAR_MASTERS = 20,
    MASTERS = 30,
}
interface Task {
    type:TaskType;
    atom:Atom;
    slave?:Atom;
}

interface IDMap<T> {
    [id:number]:T;
}

export class Atom {
    protected id = ++atomId;
    protected slaves:IDMap<Atom> = null;
    protected masters:IDMap<Atom> = null;
    protected status:AtomStatus;
    protected field:string;
    protected value:any;
    protected owner:any;
    protected calcFn:()=>void;

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
        this.checkForDestroy();
        lastGetted = this;
        if (activeSlave && autoMasters) {
            this.addTask({type: TaskType.MASTERS, atom: this, slave: activeSlave});
        }
        if (this.calcFn && this.status == AtomStatus.CREATED) {
            this.calc();
            this.status = AtomStatus.INITED;
        }
        return this.value;
    }

    set(value:any) {
        this.checkForDestroy();
        if (this.value !== value) {
            this.value = value;
            this.change();
        }
    }

    change() {
        this.checkForDestroy();
        this.addTask({type: TaskType.CHANGE, atom: this});
    }

    destroy() {
        if (debugAtoms && (debugAtoms[this.field] || debugAtoms[this.id])) {
            debug();
        }
        this.clearMasters();
        this.status = AtomStatus.DESTROYED;
        this.masters = null;
        this.slaves = null;
        this.value = null;
        this.owner = null;
    }

    static getAtom(callback:()=>void, thisArg?:any) {
        const oldAutoMasters = autoMasters;
        const oldLastGetted = lastGetted;
        autoMasters = false;
        lastGetted = null;
        callback.call(thisArg);
        if (!lastGetted) {
            throw new Error('Atom not found');
        }
        const atom = lastGetted;
        lastGetted = oldLastGetted;
        autoMasters = oldAutoMasters;
        return atom;
    }

    protected setSelfToActiveSlave(slave:Atom) {
        this.checkForDestroy();
        if (!slave.masters) {
            slave.masters = {};
        }
        slave.masters[this.id] = this;
        if (!this.slaves) {
            this.slaves = {};
        }
        this.slaves[slave.id] = slave;
    }

    protected addTask(task:Task) {
        if (!Atom.scheduledTasks) {
            Atom.scheduledTasks = [];
            Promise.resolve().then(Atom.updateScheduled);
        }
        Atom.scheduledTasks.push(task);
    }


    protected checkForDestroy() {
        if (this.status == AtomStatus.DESTROYED) {
            throw new Error('Try to use destroyed atom');
        }
    }

    protected calc() {
        this.checkForDestroy();
        const oldActiveSlave = activeSlave;
        this.addTask({type: TaskType.CLEAR_MASTERS, atom: this})
        activeSlave = this;
        const oldValue = this.value;
        this.value = this.calcFn.call(this.owner);
        activeSlave = oldActiveSlave;
        if (debugAtoms && (debugAtoms[this.field] || debugAtoms[this.id])) {
            debug();
        }
        console.info(this.field, this.id);
        return oldValue !== this.value;
    }

    protected clearMasters() {
        this.checkForDestroy();
        if (this.masters) {
            for (const id in this.masters) {
                const master = this.masters[id];
                if (master) {
                    master.slaves[this.id] = null;
                }
                this.masters[id] = null;
            }
        }
    }


    protected affect(affectAtoms:IDMap<AtomAffectStatus>) {
        affectAtoms[this.id] = 1;
        if (this.slaves) {
            for (const id in this.slaves) {
                const slave = this.slaves[id];
                if (slave) {
                    slave.affect(affectAtoms);
                }
            }
        }
    }

    protected needToRecalc(affectAtoms:IDMap<AtomAffectStatus>) {
        this.checkForDestroy();
        let status = AtomAffectStatus.NEEDNOT_CALC;
        if (this.masters) {
            for (const id in this.masters) {
                if (this.masters[id]) {
                    const masterAffectStatus = affectAtoms[id];
                    if (masterAffectStatus === AtomAffectStatus.NEEDCALC) {
                        return AtomAffectStatus.WAIT_PARENT_CALC;
                    }
                    if (masterAffectStatus === AtomAffectStatus.CALC) {
                        status = AtomAffectStatus.CALC;
                    }
                }
            }
        }
        return status;
    }

    protected update(topLevel:boolean, affectAtoms:IDMap<AtomAffectStatus>) {
        this.checkForDestroy();
        if (affectAtoms[this.id] !== AtomAffectStatus.NEEDCALC) {
            throw new Error('Something wrong');
        }
        const status = topLevel ? AtomAffectStatus.CALC : this.needToRecalc(affectAtoms);
        if (status === AtomAffectStatus.WAIT_PARENT_CALC) {
            return;
        }
        if (status === AtomAffectStatus.CALC && this.calcFn) {
            this.calc();
        }
        affectAtoms[this.id] = status;
        if (this.slaves) {
            for (const id in this.slaves) {
                const slave = this.slaves[id];
                if (slave) {
                    slave.update(false, affectAtoms);
                }
            }
        }
    }

    protected static batchUpdate(changeAtoms:IDMap<Atom>) {
        // Atom.affectAtoms = {};
        const affectAtoms:IDMap<AtomAffectStatus> = {}
        for (const id in changeAtoms) {
            var atom = changeAtoms[id];
            atom.affect(affectAtoms);
        }
        for (const id in changeAtoms) {
            var atom = changeAtoms[id];
            atom.update(true, affectAtoms);
        }
    }

    protected static scheduledTasks:Task[];

    protected static updateScheduled() {
        console.log("start schedule runner");
        let changeAtoms:IDMap<Atom> = {};
        let lastType:TaskType = null;
        let handledTaskCount = 0;
        for (var i = 0; i < Atom.scheduledTasks.length; i++) {
            var task = Atom.scheduledTasks[i];
            if (task.type == TaskType.CHANGE) {
                changeAtoms[task.atom.id] = task.atom;
            } else if (lastType == TaskType.CHANGE) {
                Atom.batchUpdate(changeAtoms);
                changeAtoms = {};
            }
            if (task.type == TaskType.CLEAR_MASTERS) {
                task.atom.clearMasters();
            }
            if (task.type == TaskType.MASTERS) {
                task.atom.setSelfToActiveSlave(task.slave);
            }
            lastType = task.type;
            handledTaskCount++;
        }
        if (lastType == TaskType.CHANGE) {
            Atom.batchUpdate(changeAtoms);
        }
        Atom.scheduledTasks.splice(0, handledTaskCount);
        if (Atom.scheduledTasks.length) {
            Atom.updateScheduled();
        }
        Atom.scheduledTasks = null;
        console.log("stop schedule runner");
    }
}


class ComponentAtom extends Atom {
    protected cmp:any;

    constructor(cmp:any) {
        super(cmp.constructor.name + '.render', null, cmp, cmp.mainRender);
        this.cmp = cmp;
    }

    get() {
        this.checkForDestroy();
        if (activeSlave && autoMasters) {
            this.addTask({type: TaskType.MASTERS, atom: this, slave: activeSlave});
        }
        this.calc();
        return this.value;
    }

    protected update(topLevel:boolean, affectAtoms:IDMap<AtomAffectStatus>) {
        this.checkForDestroy();
        if (affectAtoms[this.id] !== AtomAffectStatus.NEEDCALC) {
            throw new Error('Something wrong');
        }
        const status = topLevel ? AtomAffectStatus.CALC : this.needToRecalc(affectAtoms);
        if (status === AtomAffectStatus.WAIT_PARENT_CALC) {
            return;
        }
        if (status === AtomAffectStatus.CALC && this.calcFn) {
            this.cmp.forceUpdate();
        }
        affectAtoms[this.id] = status;
    }
}

export const autowatch = function (cls:any) {
    cls.prototype.componentAtom = null;
    cls.prototype.mainRender = cls.prototype.render;
    cls.prototype.shouldComponentUpdate = function (nextProps:any) {
        for (const prop in nextProps) {
            if (this.props[prop] !== nextProps[prop]) {
                return true;
            }
        }
        for (const prop in this.props) {
            if (this.props[prop] !== nextProps[prop]) {
                return true;
            }
        }
        return false;
    }
    cls.prototype.componentWillUnmount = function () {
        this.componentAtom.destroy();
    }
    cls.prototype.render = function () {
        if (this.componentAtom) {
            return this.componentAtom.get();
        }
        else {
            return (this.componentAtom = new ComponentAtom(this)).get();
        }
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
                let atom:Atom = this[_prop];
                if (atom) {
                    return atom.get();
                }
                else {
                    this[_prop] = atom = new Atom(fieldName, null, this, descriptor.get);
                    return atom.get();
                }
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
                atom = this[_prop] = new Atom(fieldName, null);
                atom.set(value);
            }
        },
        get: function () {
            let atom:Atom = this[_prop];
            if (atom) {
                return atom.get();
            }
            else {
                atom = this[_prop] = new Atom(fieldName, null);
                return atom.get();
            }
        }
    }
};

export class BaseArray<T> {
    @prop protected items:T[] = [];

    @prop get length() {
        return this.items.length;
    }

    protected getAtomCallback() {
        return this.items;
    }

    protected atom:Atom = Atom.getAtom(this.getAtomCallback, this);


    protected mutate() {
        this.atom.change();
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


class User {
    @prop firstName:string;
    @prop lastName:string;


    constructor(firstName:string, lastName:string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    @prop get fullName() {
        return this.firstName + ' ' + this.lastName;
    }
}

const users = new BaseArray<User>();
users.push(new User('Ivan', 'Petrashev'));
users.push(new User('Alex', 'Keffir'));
users.push(new User('Sergio', 'Valse'));

@autowatch
class TempRender {
    forceUpdate() {
        this.render();
    }

    render() {
        console.log('render', users.map(user => user.fullName).join());
    }
}

new TempRender().forceUpdate();

(window as any).users = users;