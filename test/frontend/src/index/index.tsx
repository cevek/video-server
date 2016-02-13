import * as React from 'react';
import {uploadRoute} from "../routes";
export class Index extends React.Component<{params: {}, resolved: {}}, {}> {
    render() {
        return <div>
            <a onClick={()=>uploadRoute.goto({})}>Upload</a>
        </div>
    }
}
