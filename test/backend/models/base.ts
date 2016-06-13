"use strict";

import {DB} from "../db";
import {Transaction} from "../db";
export class BaseModel<T> {
    protected table = '';
    
    constructor(protected db: DB) {
    }

    async create(item:T, trx?:Transaction) {
        return await this.db.query(this.db.insertSql(this.table, [item]), {}, trx);
    }

    async createBulk(items:T[], trx?:Transaction) {
        return await this.db.query(this.db.insertSql(this.table, items), {}, trx);
    }

    async findById(id:string | number, trx?:Transaction) {
        return await this.db.queryOne<T>(`SELECT * FROM \`${this.table}\` WHERE id=:id`, {id}, trx);
    }

    async findByIds(ids:(string | number)[], trx?:Transaction) {
        if (ids.length) {
            return await this.db.queryAll<T>(`SELECT * FROM \`${this.table}\` WHERE id IN (?)`, [ids], trx);
        }
        return [];
    }

    async findAll(params?:any | string, trx?:Transaction) {
        return await this.db.queryAll<T>(`SELECT * FROM \`${this.table}\` ${this.db.whereSql(params)}`, {}, trx);
    }

    async findOne(params?:any | string, trx?:Transaction) {
        return await this.db.queryOne<T>(`SELECT * FROM \`${this.table}\` ${this.db.whereSql(params)}`, {}, trx);
    }
}