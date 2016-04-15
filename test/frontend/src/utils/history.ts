export class EditorHistoryData<T> {
    type:string;

    constructor(json:T) {
        const anyJson:any = json;
        for (const i in json) {
            (this as any)[i] = anyJson[i];
        }
    }
}
export class EditorHistoryStringData extends EditorHistoryData<EditorHistoryStringData> {
    oldValue:string;
    newValue:string;
}

type Callback = (data:EditorHistoryData<{}>, isRedo:boolean)=>void;
interface Listener {
    callback:Callback;
    type:string;
}

export class EditorHistory {
    private listeners:Listener[] = [];
    private items:EditorHistoryData<{}>[] = [];
    private pos = -1;

    add(item:EditorHistoryData<{}>) {
        this.pos++;
        this.items[this.pos] = item;
        this.items.length = this.pos + 1;
    }

    listen(type:string, callback:Callback) {
        this.listeners.push({type: type, callback});
        return this;
    }

    private callListeners(data:EditorHistoryData<{}>, isRedo:boolean) {
        for (var i = 0; i < this.listeners.length; i++) {
            const listener = this.listeners[i];
            if (!listener.type || listener.type == data.type) {
                listener.callback(data, isRedo);
            }
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
