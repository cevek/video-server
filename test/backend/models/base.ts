import {db} from "../db";
import {Transaction} from "../db";
export class BaseModel<T> {
    protected table = '';

    async create(item:T, transaction?: Transaction) {
        return db.query(db.insertSql(this.table, [item]), transaction);
    }
    async createBulk(items:T[], transaction?: Transaction) {
        return db.query(db.insertSql(this.table, items), transaction);
    }
}