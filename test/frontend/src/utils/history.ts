type historyTypes = 'add';

interface HistoryData {
    type:historyTypes;
}

interface EditorHistoryHandlerClass {
    new (data:HistoryData): EditorHistoryHandler;
}

export class EditorHistoryHandler {
    undo(){}
    redo(){}
}

export class EditorHistory {
    history:HistoryData[];
    handlers:{[type: string]: EditorHistoryHandlerClass}

    addHandler(type:string, handler:EditorHistoryHandlerClass) {
        this.handlers[type] = handler;
    }

    addItem(item:HistoryData) {
        this.history.push(item);
    }

    undo() {
        const item = this.history[0];
        new this.handlers[item.type](item).undo();
    }
}

