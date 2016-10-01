import * as React from "react";
import {AtomArray} from "../atom-next/atom-array";
import {prop} from "../atom-next/prop";
import {autowatch} from "../atom-next/autowatch";
class Store extends AtomArray<Item> {
    @prop isProcessing = false;

    fetch() {
        this.isProcessing = true;
        setTimeout(()=> {
            this.isProcessing = false;
            this.addAll([{id: 1, text: 'Hello'}, {id: 2, text: 'Boom'}, {id: 3, text: 'Martin'}]);
        }, 1000);
    }

    save() {
        this.isProcessing = true;
        setTimeout(()=> {
            this.isProcessing = false;
        }, 1000);
    }
}

class Item {
    id:number;
    text:string;
}


@autowatch
export class Boom extends React.Component<{}, {}> {
    @prop good = true;
    store = new Store();

    constructor(props:{}) {
        super(props);
        this.store.fetch();
    }

    removeItem(item:Item) {
        console.log(this.store.remove(item));
    }

    onSave = () => {
        this.store.save();
    }

    render() {
        return <div>
            <button disabled={this.store.isProcessing} onClick={this.onSave}>Save</button>
            {this.store.isProcessing ? <div>Processing...</div> : null}
            {!this.store.isProcessing && this.store.length == 0 ? <div>Empty list</div> : null}
            {this.store.map(item =>
                <div>{item.text} <span onClick={()=>this.removeItem(item)}>x</span></div>
            )}
        </div>
    }
}

function test1(){
    return <div>
        <button>Save</button>
        <div>Processing...</div>
    </div>
}
function test2(){
    return <div>
        <button>Save</button>
        <div>Hello <span>x</span></div>
        <div>Boom <span>x</span></div>
        <div>Martin <span>x</span></div>
    </div>
}
function test22(){
    return <div>
        <button disabled="true">Save</button>
        <div>Processing...</div>
        <div>Hello <span>x</span></div>
        <div>Boom <span>x</span></div>
        <div>Martin <span>x</span></div>
    </div>
}
function test3(){
    return <div>
        <button>Save</button>
        <div>Hello <span>x</span></div>
        <div>Martin <span>x</span></div>
    </div>
}
function test4(){
    return <div>
        <button>Save</button>
        <div>Martin <span>x</span></div>
    </div>
}
function test5(){
    return <div>
        <button>Save</button>
        <div>Empty list</div>
    </div>
}

function test6(){
    return <div>
        <button>Save</button>
        <div>Empty list</div>
    </div>
}