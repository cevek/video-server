import * as React from "react";
import {EditorModel} from "./editor-model";
enum KeyCodes{
    ENTER     = 13,
    BACKSPACE = 8,
    UP        = 38,
    DOWN      = 40,
    RIGHT     = 39,
    LEFT      = 37,
    Z         = 90,
}

export class EditorKeyHandler extends React.Component<{model: EditorModel; onAction: ()=>void},{}>{
    keyHandler = (e:KeyboardEvent) => {
        const model = this.props.model;

        var handled = false;
        if (!model.selection.line || !model.selection.textLine) {
            model.selection.set(0, 0, 0);
        }

        var keyCode = e.keyCode;
        var isCtrl = e.metaKey || e.ctrlKey;
        if (keyCode == KeyCodes.ENTER) {
            if (e.shiftKey) {
                model.addUndo(model.splitIntoNewLine());
            }
            else {
                model.addUndo(model.splitWithMove());
            }
            handled = true;
        }

        if (keyCode == KeyCodes.BACKSPACE) {
            if (e.shiftKey) {
                model.addUndo(model.joinLine());
            }
            else {
                model.addUndo(model.joinLineWithMove());
            }
            handled = true;
        }

        if (keyCode == KeyCodes.Z && isCtrl) {
            model.history.undo();
            handled = true;
        }
        if (keyCode == KeyCodes.LEFT) {
            model.left();
            handled = true;
        }
        if (keyCode == KeyCodes.RIGHT) {
            model.right();
            handled = true;
        }
        if (keyCode == KeyCodes.UP) {
            model.up();
            handled = true;
        }
        if (keyCode == KeyCodes.DOWN) {
            model.down();
            handled = true;
        }

        if (handled) {
            this.forceUpdate();
            e.preventDefault();
            this.props.onAction();
            this.scroll();
        }
    };

    scroll() {
        var wordSpan = this.props.model.selection.word.span as HTMLElement;
        var rect = wordSpan.getBoundingClientRect();

        if (rect.top < 0) {
            wordSpan.scrollIntoView(true);
        }
        if (rect.bottom > (window.innerHeight || document.documentElement.clientHeight)) {
            wordSpan.scrollIntoView(false);
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyHandler);
    }
}
