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
    DESTROY = 50,
}
interface Task {
    type:TaskType;
    atom:Atom;
    slave?:Atom;
}

interface IDMap<T> {
    [id:number]:T;
}

class TaskList {
    pos = 0;
    donePos = 0;
    asyncRunned = false;
    queue:any[];
    static size = 30000;

    get list() {
        const size = TaskList.size;
        const items:any = [];
        for (var i = this.donePos; i < this.pos; i += 3) {
            const pos = i % size;
            const type:TaskType = this.queue[pos];
            items.push({type: type, atom: this.queue[pos + 1], slave: this.queue[pos + 2]});
        }
        return items;
    }

    constructor(public taskRunner:()=>void) {
        this.queue = new Array(TaskList.size);
    }


    addTask(taskType:TaskType, atom:Atom, slave?:Atom) {
        if (!this.asyncRunned) {
            this.asyncRunned = true;
            Promise.resolve().then(this.taskRunner);
        }
        const pos = this.pos % TaskList.size;
        this.queue[pos] = taskType;
        this.queue[pos + 1] = atom;
        if (slave) {
            this.queue[pos + 2] = slave;
        }
        this.pos += 3;
    }

    iterateUndone(callback:(type:TaskType, atom:Atom, slave:Atom, isLast:boolean)=>void) {
        const size = TaskList.size;
        for (var i = this.donePos; i < this.pos; i += 3) {
            const pos = i % size;
            const type:TaskType = this.queue[pos];
            callback(type, this.queue[pos + 1], type == TaskType.MASTERS ? this.queue[pos + 2] : null, i == this.pos - 3);
            this.donePos += 3;
        }
        this.asyncRunned = false;
    }
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
            Atom.scheduledTasks.addTask(TaskType.MASTERS, this, activeSlave);
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
        Atom.scheduledTasks.addTask(TaskType.CHANGE, this);
    }

    destroy() {
        this.checkForDestroy();
        if (debugAtoms && (debugAtoms[this.field] || debugAtoms[this.id])) {
            debug();
        }
        this.status = AtomStatus.DESTROYED;
        Atom.scheduledTasks.addTask(TaskType.DESTROY, this);
    }

    protected realDestroy() {
        this.clearMasters();
        this.clearSlaves();
        // this.value = null;
        this.owner = null;
        this.calcFn = null;
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

    protected checkForDestroy() {
        if (this.status == AtomStatus.DESTROYED) {
            throw new Error('Try to use destroyed atom');
        }
    }

    protected calc() {
        this.checkForDestroy();
        const oldActiveSlave = activeSlave;
        Atom.scheduledTasks.addTask(TaskType.CLEAR_MASTERS, this);
        activeSlave = this;
        const oldValue = this.value;
        this.value = this.calcFn.call(this.owner);
        activeSlave = oldActiveSlave;
        if (debugAtoms && (debugAtoms[this.field] || debugAtoms[this.id])) {
            debug();
        }
        // console.info(this.field, this.id);
        return oldValue !== this.value;
    }

    protected clearMasters() {
        if (this.masters) {
            for (const id in this.masters) {
                const master = this.masters[id];
                if (master) {
                    master.slaves[this.id] = null;
                }
                // this.masters[id] = null;
            }
            this.masters = null;
        }
    }

    protected clearSlaves() {
        if (this.slaves) {
            for (const id in this.slaves) {
                const slave = this.slaves[id];
                if (slave) {
                    slave.masters[this.id] = null;
                }
            }
            this.slaves = null;
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
        if (this.status == AtomStatus.DESTROYED) {
            return AtomAffectStatus.NEEDNOT_CALC;
        }
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

    protected static scheduledTasks = new TaskList(Atom.updateScheduled);

    protected static updateScheduled() {
        console.log("start schedule runner");
        let changeAtoms:IDMap<Atom> = {};
        let prevType:TaskType = null;

        Atom.scheduledTasks.iterateUndone((type:TaskType, atom:Atom, slave:Atom, isLast:boolean) => {
            if (type == TaskType.CHANGE) {
                changeAtoms[atom.id] = atom;
                if (isLast) {
                    Atom.batchUpdate(changeAtoms);
                    changeAtoms = {};
                }
            } else if (prevType == TaskType.CHANGE) {
                Atom.batchUpdate(changeAtoms);
                changeAtoms = {};
            }
            else if (type == TaskType.CLEAR_MASTERS) {
                atom.clearMasters();
            }
            else if (type == TaskType.MASTERS) {
                atom.setSelfToActiveSlave(slave);
            }
            else if (type == TaskType.DESTROY) {
                atom.realDestroy();
            }
            prevType = type;
        });
    }
}

(window as any).AtomGlob = Atom;

class ComponentAtom extends Atom {
    protected cmp:any;

    constructor(cmp:any) {
        super(cmp.constructor.name + '.render', null, cmp, cmp.mainRender);
        this.cmp = cmp;
    }

    get() {
        this.checkForDestroy();
        if (activeSlave && autoMasters) {
            Atom.scheduledTasks.addTask(TaskType.MASTERS, this, activeSlave);
        }
        this.calc();
        return this.value;
    }

    protected update(topLevel:boolean, affectAtoms:IDMap<AtomAffectStatus>) {
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

    const getFn = new Function(`
            var atom = this.${_prop};
            if (atom) {
                return atom.get();
            }
            else {
                atom = this.${_prop} = new AtomGlob('${fieldName}', null);
                return atom.get();
            }
            `);
    const setFn = new Function('value', `
            var atom = this.${_prop};
            if (atom) {
                atom.set(value);
            }
            else {
                this.${_prop} = new AtomGlob('${fieldName}', value);
            }
            `);
    if (descriptor && descriptor.get) {
        proto[_prop + 'Getter'] = descriptor.get;
        const getterFn = new Function(`
            var atom = this.${_prop};
            if (atom) {
                return atom.get();
            }
            else {
                atom = this.${_prop} = new AtomGlob('${fieldName}', null, this, this.${_prop}Getter);
                return atom.get();
            }
            `);
        return {
            set: void 0,
            get: getterFn
        }
    }
    return {
        set: setFn,
        get: getFn
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

    _firstName:string = null;
    _lastName:string = null;
    _fullName:string = null;
    _a1:string = null;
    _b2:string = null;
    _c3:string = null;
    _d4:string = null;
    _e5:string = null;
    _e6:string = null;
    _e7:string = null;
    _e8:string = null;


    @prop firstName:string;
    @prop lastName:string;

    constructor(firstName:string, lastName:string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    @prop get fullName() {
        return this.firstName + ' ' + this.lastName;
    }

    @prop a1 = '123';
    @prop b2 = '123';
    @prop c3 = '123';
    @prop d4 = '123';
    @prop e5 = '123';
    @prop e6 = '123';
    @prop e7 = '123';
    @prop e8 = '123';


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


function createModel() {
    new User('1', '2');
}

const cacheSize = 10000;
const cache = new Array(cacheSize);
let cachePos = 0;
const atom = {a: 1, b: 2};
function queueObj() {
    cache[cachePos++ % cacheSize] = {atom: atom, type: 1, slave: atom};
    /*
     const pos = (cachePos - 1) % cacheSize;
     const task = cache[pos];
     cache[pos] = null;
     return task.atom.a + task.type + task.slave.b;
     */
}


var cacheSize2 = 30000;
var cache2 = new Array(cacheSize2);
var cachePos2 = 0;
function queue() {
     const pos = cachePos2 % cacheSize2;
     cache2[pos] = 1;
     cache2[pos + 1] = atom;
     cache2[pos + 2] = atom;
     cachePos2 += 3;
    /*
     const pos2 = (cachePos2 - 3) % cacheSize2;
     const res = cache2[pos2] + cache2[pos2 + 1].a + cache2[pos2 + 2].b;

     cache2[pos2] = null;
     cache2[pos2 + 1] = null;
     cache2[pos2 + 2] = null;

     return res;
     */

}
const getName = ((fn:any)=>fn.name);
function abc(fn:any) {
    const name = getName(fn);
    // console.profile(name);
    console.time(name);
    for (var i = 0; i < 1000000; i++) {
        fn();
    }
    console.timeEnd(name);
    // console.profileEnd(name);
}
// abc(createModel);
// abc(queue);
// abc(queueObj);
