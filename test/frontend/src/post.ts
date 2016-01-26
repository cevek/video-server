import {IGetPost} from '../../backend/interfaces/transport';
import {Post} from '../../backend/interfaces/post';

export class PostModel{
    data: IGetPost;
    static fetch(id: number): Promise<PostModel> {
        return fetch('http://localhost:1335/v1/post/' + id).then(data => data.json()).then(data => data.data);

    }
}
