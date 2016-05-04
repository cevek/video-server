import * as React from 'react';
import {prop} from "../atom-next/prop";


export class FormField<T> {
    @prop value:T
    constructor(value:T) {
        this.value = value;
    }
}

export class Form extends React.Component<{onSubmit?:()=>void}, {}> {
    onSubmit = (e:Event) => {
        if (this.props.onSubmit) {
            this.props.onSubmit();
        }
        e.preventDefault();
    }

    render() {
        return <form onSubmit={this.onSubmit}>
            {this.props.children}
        </form>;
    }
}

export class TextInput extends React.Component<{field?:FormField<string>; onChange?:(val:string)=>void; [prop:string]:any}, {}> {
    context:any;

    el() {
        return (this.refs['ref'] as HTMLInputElement);
    }

    onInput = () => {
        if (this.props.field) {
            this.props.field.value = this.el().value;
        }
    }

    onChange = () => {
        if (this.props.onChange) {
            this.props.onChange(this.el().value);
        }
    }

    render() {
        const value = this.props.field && this.props.field.value || '';
        return <input ref="ref"
                      type="text"
                      value={value}
                      autoComplete="off" {...this.props}
                      onChange={this.onChange}
                      onInput={this.onInput}/>
    }
}