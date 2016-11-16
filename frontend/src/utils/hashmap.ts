type key = string | number;
export class HashMap<T> {
    protected _map:{[key:string]:T} = {};
    protected _keys:key[] = [];

    constructor(obj?:{[key:string]:T}) {
        for (const key in obj) {
            this.set(key, obj[key]);
        }
    }

    get(key:key):T {
        return this._map[key];
    }

    getOrThrow(key:key, errorStr?:string):T {
        const val = this._map[key];
        if (val === void 0) {
            throw new Error(errorStr || 'Item not found');
        }
        return val;
    }

    has(key:key) {
        return this._map[key] === void 0;
    }

    set(key:key, value:T) {
        if (value !== void 0) {
            if (this._map[key] === void 0) {
                this._keys.push(key);
            }
            this._map[key] = value;
        }
    }

    clear() {
        this._map = {};
        this._keys = [];
    }

    delete(key:key) {
        this._map[key] = void 0;
        const pos = this._keys.indexOf(key);
        if (pos > -1) {
            this._keys.splice(pos, 1);
        }
    }

    keys() {
        return this._keys.slice();
    }

    values() {
        const values:T[] = [];
        for (var i = 0; i < this._keys.length; i++) {
            var key = this._keys[i];
            values.push(this._map[key]);
        }
        return values;
    }
}
