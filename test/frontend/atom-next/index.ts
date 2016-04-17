const promise = (window as any).Promise.resolve();
function runMicroTask(callback:()=>void) {
    promise.then(callback);
}


export const enum AtomStatus {
    PROP = 1,
    GETTER_NO_VAL = 2,
    GETTER = 3,
    DESTROYED = -1,
}

export const enum AtomAffectStatus{
    NEEDCALC = 1,
    CALC = 5,
    NEEDNOT_CALC = 10,
    WAIT_PARENT_CALC = 30,
}

export const enum TaskType {
    CHANGE = 10,
    CLEAR_MASTERS = 20,
    MASTERS = 30,
    DESTROY = 50,
    MODIFY = 100,
}

export interface IDMap<T> {
    [id:number]:T;
}

interface Shared extends Array<Atom | number> {
    len:number;
}

export class TaskList {
    pos = 0;
    donePos = 0;
    asyncRunned = false;
    queue:any[];
    size = 30000;

    get list() {
        const items:any = [];
        for (var i = this.donePos; i < this.pos; i += 3) {
            const pos = i % this.size;
            const type:TaskType = this.queue[pos];
            items.push({type: type, atom: this.queue[pos + 1], slave: this.queue[pos + 2]});
        }
        return items;
    }

    constructor(public taskRunner:()=>void) {
        this.queue = new Array(this.size);
    }

    addTask(taskType:TaskType, atom:Atom, param?:any) {
        if (!this.asyncRunned) {
            this.asyncRunned = true;
            runMicroTask(this.taskRunner);
        }
        const pos = this.pos % this.size;
        this.queue[pos] = taskType;
        this.queue[pos + 1] = atom;
        if (param) {
            this.queue[pos + 2] = param;
        }
        this.pos += 3;
    }

    iterateUndone(callback:(type:TaskType, atom:Atom, slave:Atom, isLast:boolean)=>void) {
        if (this.pos - this.donePos > this.size) {
            throw new Error('Out of range');
        }
        for (var i = this.donePos; i < this.pos; i += 3) {
            const pos = i % this.size;
            const type:TaskType = this.queue[pos];
            callback(type, this.queue[pos + 1], type == TaskType.MASTERS ? this.queue[pos + 2] : null, i == this.pos - 3);
            this.donePos += 3;
        }
        this.asyncRunned = false;
    }
}

export class Atom {
    protected id = ++Atom.atomId;
    protected slaves:Atom[];
    protected masters:Atom[];
    protected status:AtomStatus;
    protected field:string;
    protected value:any;
    protected owner:any;
    protected calcFn:()=>void;
    protected static activeSlave:Atom;
    protected static lastGetted:Atom;
    protected static autoMasters = true;
    protected static atomId = 0;
    protected static debugAtoms:{[id:string]:boolean} = null;

    static debugAtom(name:string) {
        if (!Atom.debugAtoms) {
            Atom.debugAtoms = {};
        }
        Atom.debugAtoms[name] = true;
    }

    protected static debug() {
        debugger;
    }

    prop(field:string, value:any) {
        this.value = value;
        this.field = field;
        this.slaves = null;
        this.status = AtomStatus.PROP;
        return this;
    }

    getter(field:string, owner:any, calcFn:()=>void) {
        this.value = null;
        this.field = field;
        this.slaves = null;
        this.calcFn = calcFn;
        this.owner = owner;
        this.masters = [];
        this.status = AtomStatus.GETTER_NO_VAL;
        return this;
    }


    get() {
        this.checkForDestroy();
        Atom.lastGetted = this;
        if (this.status == AtomStatus.GETTER_NO_VAL) {
            this.calc();
        }
        if (Atom.activeSlave && Atom.autoMasters) {
            const activeSlaveMasters = Atom.activeSlave.masters;
            var len = activeSlaveMasters.length;
            var shared = Atom.shared;
            var sharedLen = shared.len;
            var k = Atom.k;
            // if find self in activeSlave masters exit
            for (var i = 0; i < len; i++) {
                if (activeSlaveMasters[i] == this) {
                    shared[i] = k;
                    return this.value;
                }
            }
            // if find self in added list exit
            for (i = len; i < sharedLen; i++) {
                if (shared[i] == this) {
                    return this.value;
                }
            }
            // add self to added list
            shared[shared.len++] = this;
        }

        return this.value;
    }

    getOld() {
        this.checkForDestroy();
        Atom.lastGetted = this;
        if (Atom.activeSlave && Atom.autoMasters) {
            Atom.scheduledTasks.addTask(TaskType.MASTERS, this, Atom.activeSlave);
        }
        if (this.status == AtomStatus.GETTER_NO_VAL) {
            this.calc();
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
        if (Atom.debugAtoms && (Atom.debugAtoms[this.field] || Atom.debugAtoms[this.id])) {
            Atom.debug();
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
        const oldAutoMasters = Atom.autoMasters;
        const oldLastGetted = Atom.lastGetted;
        Atom.autoMasters = false;
        Atom.lastGetted = null;
        callback.call(thisArg);
        if (!Atom.lastGetted) {
            throw new Error('Atom not found');
        }
        const atom = Atom.lastGetted;
        Atom.lastGetted = oldLastGetted;
        Atom.autoMasters = oldAutoMasters;
        return atom;
    }

    protected setSelfToActiveSlave(slave:Atom) {
        this.checkForDestroy();
        if (!slave.masters) {
            slave.masters = [];
        }
        slave.masters[this.id] = this;
        if (!this.slaves) {
            this.slaves = [];
        }
        this.slaves[slave.id] = slave;
    }

    protected checkForDestroy() {
        if (this.status == AtomStatus.DESTROYED) {
            throw new Error('Try to use destroyed atom');
        }
    }

    protected static shared:Shared;
    protected static sharedCache:Shared[] = [];
    protected static sharedCachePos = -1;
    protected static k = 0;

    protected calc() {
        Atom.k++;
        const oldActiveSlave = Atom.activeSlave;
        Atom.activeSlave = this;
        var prevShared = Atom.shared;
        Atom.shared = Atom.sharedCachePos == -1 ? ([] as Shared) : Atom.sharedCache[Atom.sharedCachePos--];
        Atom.shared.len = this.masters.length;
        const oldValue = this.value;
        this.value = this.calcFn.call(this.owner);
        Atom.scheduledTasks.addTask(TaskType.MODIFY, this, Atom.shared);
        Atom.shared = prevShared;
        Atom.activeSlave = oldActiveSlave;
        this.status = AtomStatus.GETTER;
        // console.info(this.field, this.id);
        return oldValue !== this.value;
    }

    protected applyModify(shared:Shared) {
        var k = Atom.k;
        const masters = this.masters;
        const len = masters.length;

        // find and remove old masters
        var removeCount = 0;
        for (var i = 0; i < len; i++) {
            if (removeCount) {
                masters[i - removeCount] = masters[i];
            }
            if (shared[i] !== k) {
                this.removeSelfFromList(masters[i].slaves);
                removeCount++;
            }
        }
        for (i = 0; i < removeCount; i++) {
            masters.pop();
        }

        for (i = len; i < shared.len; i++) {
            masters.push(shared[i + len] as Atom);
        }
        Atom.sharedCache[++Atom.sharedCachePos] = shared;
    }

    protected calcOld() {
        this.checkForDestroy();
        const oldActiveSlave = Atom.activeSlave;
        Atom.scheduledTasks.addTask(TaskType.CLEAR_MASTERS, this);
        Atom.activeSlave = this;
        const oldValue = this.value;
        if (Atom.debugAtoms && (Atom.debugAtoms[this.field] || Atom.debugAtoms[this.id])) {
            Atom.debug();
        }
        this.value = this.calcFn.call(this.owner);
        Atom.activeSlave = oldActiveSlave;
        this.status = AtomStatus.GETTER;
        // console.info(this.field, this.id);
        return oldValue !== this.value;
    }

    protected clearMasters() {
        var masters = this.masters;
        if (masters) {
            for (var i = 0, len = masters.length; i < len; i++) {
                this.removeSelfFromList(masters[i].slaves);
            }
            this.masters = null;
        }
    }

    protected clearSlaves() {
        var slaves = this.slaves;
        if (slaves) {
            for (var i = 0, len = slaves.length; i < len; i++) {
                this.removeSelfFromList(slaves[i].masters);
            }
            this.slaves = null;
        }
    }

    protected removeSelfFromList(items:Atom[]) {
        var found = false;
        for (var i = 0, len = items.length; i < len; i++) {
            if (found) {
                items[i - 1] = items[i];
            }
            else if (items[i] === this) {
                found = true;
            }
        }
        if (found) {
            items.pop();
        }
    }


    protected affect(affectAtoms:IDMap<AtomAffectStatus>) {
        affectAtoms[this.id] = 1;

        var slaves = this.slaves;
        if (slaves) {
            for (var i = 0, len = slaves.length; i < len; i++) {
                slaves[i].affect(affectAtoms);
            }
            this.slaves = null;
        }
    }

    protected needToRecalc(affectAtoms:IDMap<AtomAffectStatus>) {
        if (this.status == AtomStatus.DESTROYED) {
            return AtomAffectStatus.NEEDNOT_CALC;
        }
        let status = AtomAffectStatus.NEEDNOT_CALC;
        var masters = this.masters;
        if (masters) {
            for (var i = 0, len = masters.length; i < len; i++) {
                const master = masters[i]
                const masterAffectStatus = affectAtoms[master.id];
                if (masterAffectStatus === AtomAffectStatus.NEEDCALC) {
                    return AtomAffectStatus.WAIT_PARENT_CALC;
                }
                if (masterAffectStatus === AtomAffectStatus.CALC) {
                    status = AtomAffectStatus.CALC;
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
        if (status === AtomAffectStatus.CALC && this.status === AtomStatus.GETTER) {
            this.calc();
        }
        affectAtoms[this.id] = status;
        if (this.slaves) {
            for (var i = 0; i < this.slaves.length; i++) {
                this.slaves[i].update(false, affectAtoms);
            }
        }
    }

    protected static batchUpdate(changeAtoms:Atom[]) {
        // Atom.affectAtoms = {};
        const affectAtoms:IDMap<AtomAffectStatus> = {}

        for (var i = 0; i < changeAtoms.length; i++) {
            changeAtoms[i].affect(affectAtoms);
        }
        for (var i = 0; i < changeAtoms.length; i++) {
            changeAtoms[i].update(true, affectAtoms);
        }
    }

    protected static scheduledTasks = new TaskList(Atom.updateScheduled);

    protected static updateScheduled() {
        console.log("start schedule runner");
        let changeAtoms:Atom[] = [];
        let prevType:TaskType = null;

        Atom.scheduledTasks.iterateUndone((type:TaskType, atom:Atom, param:any, isLast:boolean) => {
            if (type == TaskType.CHANGE) {
                changeAtoms.push(atom);
                if (isLast) {
                    Atom.batchUpdate(changeAtoms);
                    changeAtoms = [];
                }
            } else if (prevType == TaskType.CHANGE) {
                Atom.batchUpdate(changeAtoms);
                changeAtoms = [];
            }
            else if (type == TaskType.MASTERS) {
                atom.applyModify(param);
                // atom.setSelfToActiveSlave(slave);
            }
            else if (type == TaskType.DESTROY) {
                atom.realDestroy();
            }
            prevType = type;
        });
    }
}

(window as any).AtomGlob = Atom;
(window as any).debugAtom = Atom.debugAtom;
