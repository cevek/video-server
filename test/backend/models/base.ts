import {db} from "../db";
import {Transaction} from "../db";
export class BaseModel<T> {
    protected table = '';

    async create(item:T, trx?:Transaction) {
        return await db.query(db.insertSql(this.table, [item]), {}, trx);
    }

    async createBulk(items:T[], trx?:Transaction) {
        return await db.query(db.insertSql(this.table, items), {}, trx);
    }

    async findById(id:string | number, trx?:Transaction) {
        return await db.queryOne<T>(`SELECT * FROM ${this.table} WHERE id=:id`, {id}, trx);
    }
}