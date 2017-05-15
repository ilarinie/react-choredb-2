import * as React from 'react';

export class Notification extends React.Component<any, any> {
    
    _timer: any = null;

    constructor(props: any) {
        super(props);
        this.state = {
            delay: this.props.delay,
            visible: true
        };
    }
    
    componentDidMount = () => {
        this.setTimer();
    }

    setTimer = () => {
        if (this._timer != null) {
            clearTimeout(this._timer);
        }

        this._timer = setTimeout(() => {
            this.setState({ visible: false });
            this._timer = null;
        },                       this.state.delay);

    }

    render() {
        return this.state.visible
            ? <div>{this.props.children}</div>
            : <span/>;
    }

}

export default Notification;