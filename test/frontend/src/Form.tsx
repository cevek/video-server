import * as React from 'react';

export class Form extends React.Component<{values:any, onSubmit?:()=>void}, {}> {
    getChildContext() {
        return {form: this.props.values};
    }

    static childContextTypes = {
        form: React.PropTypes.any
    }

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

export class TextInput extends React.Component<{name: string, onChange?: (val:string)=>void; [prop: string]: any}, {}> {
    context:any;

    el() {
        return (this.refs['ref'] as HTMLInputElement);
    }

    onInput = () => {
        if (this.context.form) {
            this.context.form[this.props.name] = this.el().value;
        }
    }

    onChange = () => {
        if (this.props.onChange) {
            this.props.onChange(this.el().value);
        }
    }

    render() {
        const value = this.context.form ? this.context.form[this.props.name] : '';
        return <input ref="ref" type="text" value={value} autoComplete="off" {...this.props} onChange={this.onChange} onInput={this.onInput}/>
    }
}