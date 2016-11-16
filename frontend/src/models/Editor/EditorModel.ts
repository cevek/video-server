import {PostViewModel} from "./PostViewModel";
import {EditorSelection} from "./EditorSelection";
import {prop} from "atom-next";
import {EditorPostModel} from "./EditorPostModel";
import {EditorTextModel} from "./EditorTextModel";
export class EditorModel extends PostViewModel {
    @prop selection: EditorSelection;
    post: EditorPostModel;
    // history: EditorHistory;
    textModel: EditorTextModel;

    constructor(post: EditorPostModel) {
        super(post);
        this.textModel = new EditorTextModel(this);
    }

    static fetch(id: number) {
        return EditorPostModel.fetch(id).then(post => new EditorModel(post));
    }
}