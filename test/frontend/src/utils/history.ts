export class EditorHistoryData {
    type: string;
    constructor(json: any) {
        for (const i in json) {
            (this as any)[i] = json[i];
        }
    }
}
type Callback = (data:EditorHistoryData, isRedo:boolean)=>void;


export class EditorHistory {
    private listeners:Callback[] = [];
    private items:EditorHistoryData[] = [];
    private pos = -1;

    add(item:EditorHistoryData) {
        this.pos++;
        this.items[this.pos] = item;
        this.items.length = this.pos + 1;
    }

    listen(callback:Callback) {
        this.listeners.push(callback);
        return this;
    }

    unlisten(callback:Callback) {
        const pos = this.listeners.indexOf(callback);
        if (pos > -1) {
            this.listeners.splice(pos, 1);
        }
        return this;
    }

    private callListeners(data:EditorHistoryData, isRedo:boolean) {
        for (var i = 0; i < this.listeners.length; i++) {
            this.listeners[i](data, isRedo);
        }
    }

    undo() {
        if (this.pos >= 0) {
            const item = this.items[this.pos];
            this.callListeners(item, false);
            this.pos--;
            return item;
        }
        return null;
    }

    redo() {
        if (this.pos < this.items.length - 1) {
            this.pos++;
            const item = this.items[this.pos];
            this.callListeners(item, true);
            return item;
        }
        return null;
    }
}
