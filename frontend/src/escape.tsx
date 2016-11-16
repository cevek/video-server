import * as React from 'react';

export class Escape extends React.Component<{onEscape: ()=>void}, {}> {
    componentDidMount() {
          document.documentElement.addEventListener('keydown', this.onKeyDown)
    }

    onKeyDown = (e: KeyboardEvent) => {
        if (e.keyCode == 27) {
            this.props.onEscape();
        }
    }

    componentWillUnmount() {
        document.documentElement.removeEventListener('keydown', this.onKeyDown)
    }

    render():React.ReactElement<{}> {
        return null;
    }
}