'use strict';

var mysql = require('mysql2');
import {config} from './config';
var pool = mysql.createPool({
    database: config.db.name,
    user: config.db.user,
    password: config.db.password
});
type Params = {[key: string]: string | number} | (string | number)[];
interface Connection {
    query(q:string, params:Params, callback:(err:Error, values:any)=>void):void;
}

class DB {
    async query<T>(query:string, params?:Params, trx?:Transaction):Promise<T> {
        var connection = trx ? trx.connection : await db.getConnection();
        var res = await (new Promise<T>((resolve, reject)=> {
            if (query) {
                var q = connection.query(query, params, (err:Error, rows:T) => {
                    if (err) {
                        //Got a packet bigger than 'max_allowed_packet' bytes
                        if ((<any>err).errno == 1153) {
                            //todo: after this error all next queries is this connection freeze
                        }
                        err.message = err.message + '\n' + q.sql;
                        return reject(err);
                    }
                    resolve(rows);
                });
            } else {
                resolve(null);
            }
        }));
        if (!trx) {
            connection.release();
        }
        return res;
    }

    insertSql(table:string, values:any[]) {

        var keysSet = new Set();
        for (var i = 0; i < values.length; i++) {
            for (var field in values[i]) {
                keysSet.add(field);
            }
        }
        var keys = [...keysSet.values()];
        var arrValues:string[][] = [];
        for (var value of values) {
            var arrValue:string[] = [];
            for (var key of keys) {
                arrValue.push(mysql.escape(value[key]));
            }
            arrValues.push(arrValue);
        }
        return arrValues.length === 0 ? '' : `INSERT INTO \`${table}\` (${keys.map(
            k => `\`${k}\``).join(", ")}) VALUES (${arrValues.map(
            v => `${v.join(", ")}`).join("), (")});`;
    }

    whereSql(params:any) {
        if (params && typeof params == 'object') {
            var conditions = Object.keys(params)
                .map(k => `${k} ${params[k] === null ? 'IS' : '='} ${mysql.escape(params[k])}`);
            return conditions.length > 0 ? ('WHERE ' + conditions.join(' AND ')) : ''
        }
        if (typeof params == 'string') {
            return params;
        }
    }

    async queryOne<T>(query:string, params?:any, trx?:Transaction) {
        return (await db.query<T[]>(query, params, trx))[0];
    }

    async queryAll<T>(query:string, params?:any, trx?:Transaction) {
        return (await db.query<T[]>(query, params, trx)) || [];
    }

    async transaction(fn:(transaction:Transaction)=>Promise<any>) {
        var transaction = await this.beginTransaction();
        try {
            await fn(transaction);
            await transaction.commit();
        }
        catch (e) {
            await transaction.rollback();
            throw e;
        }
    }

    async beginTransaction():Promise<Transaction> {
        const trx = new Transaction(this);
        return await trx.begin();
    }

    async getConnection():Promise<any> {
        return await (new Promise((resolve, reject)=> {
            pool.getConnection((err:Error, connection:any) => {
                if (err) {
                    return reject(err);
                }
                connection.config.namedPlaceholders = true;
                resolve(connection);
            });
        }));
    }
}
export const db = new DB();

export class Transaction {
    public connection:Connection;

    constructor(public db:DB) {}

    async begin() {
        this.connection = await db.getConnection();
        await this.db.query<void>('START TRANSACTION', null, this);
        return this;
    }

    async commit() {
        await this.db.query<void>('COMMIT', null, this);
        return this;
    }

    async rollback() {
        await this.db.query<void>('ROLLBACK', null, this);
        return this;
    }
}


