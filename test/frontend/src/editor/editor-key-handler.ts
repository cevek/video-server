import * as React from "react";
import {EditorModel} from "./editor-model";
import {autowatch} from "../../atom-next/autowatch";
enum KeyCodes {
    ENTER     = 13,
    BACKSPACE = 8,
    UP        = 38,
    DOWN      = 40,
    RIGHT     = 39,
    LEFT      = 37,
    Z         = 90,
}

@autowatch
export class EditorKeyHandler extends React.Component<{model: EditorModel;},{}>{
    keyHandler = (e:KeyboardEvent) => {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) {
            return;
        }
        const model = this.props.model;

        var handled = false;
        if (!model.textModel.selection.line || !model.textModel.selection.textLine) {
            model.textModel.selection.set(0, 0, 0);
        }

        var keyCode = e.keyCode;
        var isCtrl = e.metaKey || e.ctrlKey;
        if (keyCode == KeyCodes.ENTER) {
            if (e.shiftKey) {
                model.history.add(model.textModel.splitIntoNewLine());
            }
            else {
                model.history.add(model.textModel.splitWithMove());
            }
            handled = true;
        }

        if (keyCode == KeyCodes.BACKSPACE) {
            if (e.shiftKey) {
                model.history.add(model.textModel.joinLine());
            }
            else {
                model.history.add(model.textModel.joinLineWithMove());
            }
            handled = true;
        }

        if (keyCode == KeyCodes.Z && isCtrl) {
            model.history.undo();
            handled = true;
        }
        if (keyCode == KeyCodes.LEFT) {
            model.textModel.left();
            handled = true;
        }
        if (keyCode == KeyCodes.RIGHT) {
            model.textModel.right();
            handled = true;
        }
        if (keyCode == KeyCodes.UP) {
            model.textModel.up();
            handled = true;
        }
        if (keyCode == KeyCodes.DOWN) {
            model.textModel.down();
            handled = true;
        }

        if (handled) {
            e.preventDefault();
            this.scroll();
        }
    };

    scroll() {
        var wordSpan = this.props.model.textModel.selection.word.span as HTMLElement;
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

    render():any{
        return null;
    }
}
