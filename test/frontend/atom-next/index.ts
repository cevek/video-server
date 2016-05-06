const promise = (window as any).Promise.resolve();
function runMicroTask(callback:()=>void) {
    promise.then(callback);
}


export enum AtomStatus {
    PROP = 1,
    GETTER_NO_VAL = 2,
    GETTER = 3,
    DESTROYED = -1,
}

export enum AtomAffectStatus{
    NEEDCALC = 1,
    CALC = 5,
    NEEDNOT_CALC = 10,
    WAIT_PARENT_CALC = 30,
}

export enum TaskType {
    CHANGE = 10,
    DESTROY = 50,
    MODIFY = 100,
}

export interface IDMap<T> {
    [id:number]:T;
}

interface Shared extends Array<Atom | number> {
    len:number;
    lastModifyTaskId:number;
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

    iterateUndone(callback:(type:TaskType, atom:Atom, param:any, isLast:boolean)=>void) {
        if (this.pos - this.donePos > this.size) {
            throw new Error('Out of range');
        }
        for (var i = this.donePos; i < this.pos; i += 3) {
            const pos = i % this.size;
            const type:TaskType = this.queue[pos];
            callback(type, this.queue[pos + 1], type == TaskType.MODIFY ? this.queue[pos + 2] : null, i == this.pos - 3);
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
    protected lastModifyTaskId:number;
    protected calcFn:()=>void;
    protected static activeSlave:Atom = null;
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
        this.lastModifyTaskId = null;
        this.status = AtomStatus.GETTER_NO_VAL;
        return this;
    }


    getWithCalc() {
        if (this.status === AtomStatus.GETTER_NO_VAL) {
            this.calc();
        }
        return this.get();
    }

    getWithForceCalc() {
        this.calc();
        return this.get();
    }

    get() {
        //this.checkForDestroy();
        var activeSlave = Atom.activeSlave;
        if (activeSlave) {
            var activeSlaveMasters = activeSlave.masters;
            var len = activeSlaveMasters.length;
            var shared = Atom.shared;
            // if find self in activeSlave masters exit
            var k = shared.lastModifyTaskId;
            for (var i = 0; i < len; i++) {
                if (activeSlaveMasters[i] === this) {
                    shared[i] = k;
                    return this.value;
                }
            }
            // if find self in added list exit
            var sharedLen = shared.len;
            for (var j = len; j < sharedLen; j++) {
                if (shared[j] === this) {
                    return this.value;
                }
            }
            // add self to added list
            shared[shared.len++] = this;
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

    static serviceAtom = new Atom().getter('private', null, null);

    static getAtom(callback:()=>void, thisArg?:any) {
        var prevShared = Atom.shared;
        const oldActiveSlave = Atom.activeSlave;
        Atom.activeSlave = Atom.serviceAtom;
        Atom.shared = Atom.sharedCachePos === -1 ? Atom.getShared() : Atom.sharedCache[Atom.sharedCachePos--];
        Atom.shared.len = 0;
        callback.call(thisArg);
        if (!Atom.shared.len) {
            throw new Error('Atom not found');
        }
        const atom = Atom.shared[0] as Atom;
        Atom.shared = prevShared;
        Atom.activeSlave = oldActiveSlave;
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

    protected static shared:Shared = null;
    protected static sharedCache:Shared[] = [];
    protected static sharedCachePos = -1;

    protected static getShared() {
        const a = [] as Shared;
        a.lastModifyTaskId = 0;
        a.len = 0;
        return a;
    }

    protected static lastModifyTaskId = 0;

    protected calc() {
        const oldActiveSlave = Atom.activeSlave;
        Atom.activeSlave = this;
        var prevShared = Atom.shared;
        Atom.shared = Atom.sharedCachePos === -1 ? Atom.getShared() : Atom.sharedCache[Atom.sharedCachePos--];
        Atom.shared.len = this.masters.length;
        this.lastModifyTaskId = Atom.shared.lastModifyTaskId = Atom.lastModifyTaskId++;
        const oldValue = this.value;
        this.value = this.calcFn.call(this.owner);
        Atom.scheduledTasks.addTask(TaskType.MODIFY, this, Atom.shared);
        // this.applyModify(Atom.shared);
        Atom.shared = prevShared;
        Atom.activeSlave = oldActiveSlave;
        this.status = AtomStatus.GETTER;
        // console.info(this.field, this.id);
        return oldValue !== this.value;
    }

    protected applyModify(shared:Shared) {
        if (this.lastModifyTaskId !== shared.lastModifyTaskId) {
            return;
        }
        var k = shared.lastModifyTaskId;
        const masters = this.masters;
        const len = masters.length;

        // find and remove old masters
        var removeCount = 0;
        for (var i = 0; i < len; i++) {
            if (removeCount > 0) {
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
            const atom = shared[i] as Atom;
            masters.push(atom);
            if (!atom.slaves) {
                atom.slaves = [];
            }
            atom.slaves.push(this);
        }

        Atom.sharedCache[++Atom.sharedCachePos] = shared;
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
        if (affectAtoms[this.id] === AtomAffectStatus.CALC) {
            return;
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

    static updateScheduled() {
        // console.log("start schedule runner");
        let changeAtoms:Atom[];
        let prevType:TaskType;


        const sc = Atom.scheduledTasks;
        if (sc.pos - sc.donePos > sc.size) {
            throw new Error('Out of range');
        }
        for (var i = sc.donePos; i < sc.pos; i += 3) {
            const pos = i % sc.size;
            const type:TaskType = sc.queue[pos];
            const atom:Atom = sc.queue[pos + 1];
            const param = type == TaskType.MODIFY ? sc.queue[pos + 2] : null;
            const isLast = i == sc.pos - 3;

            if (type == TaskType.CHANGE) {
                if (!changeAtoms) {
                    changeAtoms = [];
                }
                changeAtoms.push(atom);
                if (isLast) {
                    Atom.batchUpdate(changeAtoms);
                    changeAtoms = [];
                }
            }
            else if (prevType == TaskType.CHANGE) {
                Atom.batchUpdate(changeAtoms);
                changeAtoms = null;
            }
            if (type == TaskType.MODIFY) {
                atom.applyModify(param);
            }
            else if (type == TaskType.DESTROY) {
                atom.realDestroy();
            }
            prevType = type;
            sc.donePos += 3;
        }
        sc.asyncRunned = false;
    }
}

(window as any).AtomGlob = Atom;
(window as any).debugAtom = Atom.debugAtom;
/*
 const a1 = new Atom().prop('a1', 1);
 const a2 = new Atom().prop('a2', 2);
 const a3 = new Atom().prop('a3', 3);
 const a4 = new Atom().prop('a4', 4);
 const a5 = new Atom().prop('a5', 5);
 const a6 = new Atom().prop('a6', 6);
 const a7 = new Atom().prop('a7', 7);
 const a8 = new Atom().prop('a8', 8);
 const a9 = new Atom().prop('a9', 9);
 const a0 = new Atom().prop('a0', 0);

 const b1 = new Atom().prop('a1', 1);
 const b2 = new Atom().prop('a2', 2);
 const b3 = new Atom().prop('a3', 3);
 const b4 = new Atom().prop('a4', 4);
 const b5 = new Atom().prop('a5', 5);
 const b6 = new Atom().prop('a6', 6);
 const b7 = new Atom().prop('a7', 7);
 const b8 = new Atom().prop('a8', 8);
 const b9 = new Atom().prop('a9', 9);
 const b0 = new Atom().prop('a0', 0);

 let x = 0;
 const sum = new Atom().getter('sum', {}, () => {
 a1.get();
 a2.get();
 a3.get();
 a4.get();
 a5.get();
 a6.get();
 a7.get();
 a8.get();
 a9.get();
 a0.get();
 //
 // return x++ % 2 == 0 ? a.get() : b.get();
 });*/

/*
 function abc() {
 console.time('perf');
 for (var i = 0; i < 1000000; i++) {
 sum.calc();
 // Atom.updateScheduled();
 }
 console.timeEnd('perf');
 }
 */

// abc();


/*

 const a = new Atom().prop('a', '[A]');
 const b = new Atom().prop('b', '[B]');
 const c = new Atom().prop('c', '[C]');

 let x = 0;
 const sum = new Atom().getter('sum', null, () => {
 c.get();
 return x++ % 2 == 0 ? a.get() : b.get();
 });
 sum.get();
 Atom.updateScheduled();

 a.set('[A1]');
 Atom.updateScheduled();

 b.set('[B1]');
 Atom.updateScheduled();
 */

/*

 const render = new Atom().getter('render', null, () => {
 x++;
 const val = (x % 2 == 0 ? b.get() : (a.get() + sum.get()));
 console.log('render', val);
 })
 render.get();
 a.set('[A1]');
 setTimeout(() => {
 a.set('[A0]');
 setTimeout(() => {
 a.set('[Ax]');
 });
 });
 */
/*


class Model {
    static find(exp:Expression) {
        return this;
    }

    static findAll(exp:Expression) {
        return this;
    }

    static include(model:typeof Model) {
        return this;
    }
}


class Expression {

}

class Prop<T> extends Expression {
    eq(val:T | Prop<T>):this {
        return this;
    }

    gt(val:T | Prop<T>):this {
        return this;
    }

    lt(val:T | Prop<T>):this {
        return this;
    }

    in(val:(T | Prop<T>)[]):this {
        return this;
    }

    isNull():this {
        return this;
    }

    isNotNull():this {
        return this;
    }
}

class HasOne<T> extends Prop<T> {
    constructor(model:typeof Model) {
        super();
    }
}
class HasMany<T> extends Prop<T> {
    constructor(model:typeof Model) {
        super();
    }
}

function $and(...exp:Expression[]):Expression {
    return null;
}
function $or(...exp:Expression[]):Expression {
    return null;
}
function $sql(...exp:Expression[]):typeof Model {
    return null;
}

function leftJoin(aModel:typeof Model, bModel:typeof Model, on:Expression):Expression {
    return null;
}


class User extends Model {
    static id = new Prop<number>();
    static name = new Prop<number>();
    static isBot = new Prop<boolean>();
    static points = new Prop<number>();
}
class Contest extends Model {
    static id = new Prop<number>();
    static createdAt = new Prop<Date>();
    static endedAt = new Prop<Date>();
}
class ContestLineup extends Model {
    static id = new Prop<number>();
    static contestId = new HasOne<number>(Contest);
    static lineupId = new HasOne<number>(Lineup);
}
class Lineup extends Model {
    static userId = new HasOne<number>(User);
}
class Game extends Model {
    static id = new Prop<number>();
    static name = new Prop<number>();
}
class UserGame extends Model {
    static id = new Prop<number>();
    static userId = new HasMany<number>(User);
    static gameId = new HasMany<number>(Game);
}

class Account extends Model {
    static userId = new HasOne<number>(User);
    static balance = new Prop<number>();
}


const u = User;
const a = Account;

interface iXXX {
    id?:number;
    hello:string;
    name:string;
    isBot:boolean;
}

let jprop:any;
let json:any;

class FModel<T> {
    json:T;

    constructor(json?:T) {
        this.json = json;
    }
}

class XXX extends FModel<iXXX> implements iXXX {
    @json id:number;
    @json hello:string;
    @json name:string;
    @json isBot:boolean;

    static fetch(json:iXXX) {
        new XXX(json);
    }
}

interface iBBB extends iXXX {
    fix:number;
}
class BBB extends XXX implements iBBB {
    fix:number;

    static fetch(json:iBBB) {
        new BBB(json);
    }
}


Contest.findAll([
    Contest.createdAt.gt(new Date),
    Contest.endedAt.isNull(),
])
Contest.findAll({
    include: ContestLineup,
    where: [
        User.isBot.eq(true),
    ],
})


$sql(leftJoin(User, Account, $and(a.userId.eq(u.id), a.balance.gt(0)))
    .include(Account)
    .findAll($and(u.name.eq(123), u.name.eq(123), u.points.gt(123))))

*/
