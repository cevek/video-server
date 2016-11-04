import {Post2Model} from "./PostViewModel";
import {EditorSelection} from "./EditorTextSelection";
import {prop} from "atom-next";
import {EditorPostModel} from "./EditorPostModel";
import {EditorHistory} from "../../utils/history";
import {EditorTextModel} from "./EditorTextModel";
export class EditorModel extends Post2Model {
    @prop selection: EditorSelection;
    post: EditorPostModel;
    history: EditorHistory;
    textModel: EditorTextModel;

    constructor(post: EditorPostModel) {
        super(post);
        this.textModel = new EditorTextModel(this);
    }

    static fetch(id: number) {
        return EditorPostModel.fetch(id).then(post => new EditorModel(post));
    }
}