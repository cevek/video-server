'use strict';


interface IndexVal<T> {
    [val: string]: T[];
    $keys: any;
}
interface Index<T> {
    [val: string]: IndexVal<T>;
}
export class SuperArray<T> extends Array {
    constructor() {
        super();
    }

    private indexUnique:Index<T>;
    private index:Index<T>;

    createIndex(field:string, isUnique:boolean) {
        let index:Index<T>;
        if (isUnique) {
            if (!this.indexUnique) {
                Object.defineProperty(this, 'indexUnique', {value: {}});
            }
            index = this.indexUnique;
        } else {
            if (!this.index) {
                Object.defineProperty(this, 'index', {value: {}});
            }
            index = this.index;
        }

        if (typeof index[field] == 'undefined') {
            index[field] = {$keys: []};
        }
        const indexKeys = index[field].$keys;
        const indexFieldMap = index[field];

        for (let i = 0; i < this.length; i++) {
            const item = this[i];
            if (typeof item[field] == 'undefined') {
                throw new Error(`Array[${i}].${field} value is undefined. Array item: ${JSON.stringify(item)}`);
            }
            const value = item[field];
            if (typeof indexFieldMap[value] == 'undefined') {
                indexFieldMap[value] = isUnique ? item : new SuperArray();
                indexKeys.push(value);
            }
            if (!isUnique) {
                indexFieldMap[value].push(item);
            }
        }
    }

    getBy(field:string, value:string | number) {
        if (typeof this.indexUnique == 'undefined' || typeof this.indexUnique[field] == 'undefined') {
            this.createIndex(field, true);
        }
        return this.indexUnique[field][value] || null;
    }

    getAllBy(field:string, value:string | number) {
        if (typeof this.index == 'undefined' || typeof this.index[field] == 'undefined') {
            this.createIndex(field, false);
        }
        return this.index[field][value] || [];
    }

    getIndexMap(field:string) {
        if (typeof this.index != 'undefined' && typeof this.index[field] != 'undefined') {
            return this.index[field].$keys;
        }
        if (typeof this.indexUnique == 'undefined' || typeof this.indexUnique[field] == 'undefined') {
            this.createIndex(field, true);
        }
        return this.indexUnique[field].$keys;
    }

    /*
     map() {
     return new DbResult(super.map.apply(this, arguments));
     }

     filter() {
     return new DbResult(super.filter.apply(this, arguments));
     }

     concat() {
     return new DbResult(super.concat.apply(this, arguments));
     }

     slice() {
     return new DbResult(super.slice.apply(this, arguments));
     }
     */

    set(i:number, value:T) {
        this[i] = value;
    }
}


const a:any = null;

class AA<T> {
    getBy<V>(fun:(item:T)=>V, val:V):T {
        return null;
    }
}
class DFDList extends AA<DFD> {
    @a
    getById(id:number) {
        return this.getBy(item => item.id, id);
    }
}

class Component {
}


var top:any = null;
function auto(cmp: any){
    cmp.prototype.updater = function(){
        this.forceUpdate();
    }
    cmp.prototype.render2 = cmp.prototype.render;
    cmp.prototype.render = function(){
        const oldTop = top;
        top = this;
        const result = this.render2();
        top = oldTop;
        return result;
    }
}

@auto
class MyCmp extends Component {
    render(){
        
    }
}


class DFD {
    id:number;
    name:string;
}




/*
 const a = new DbResult([{id: 1}, {id: 2}]);
 a.getBy('id', 1);
 for (const i in a) {
 console.log(i);
 }*/

