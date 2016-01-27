import {IGetPost} from "../../../interfaces/transport";
export class PostModel{
    data: IGetPost;
    static fetch(id: number): Promise<PostModel> {
        return fetch('http://localhost:1335/v1/post/' + id).then(data => data.json()).then(data => ({data: data.data}));

    }
}
