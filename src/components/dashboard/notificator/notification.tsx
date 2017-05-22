import * as React from 'react';
import Snackbar from 'material-ui/Snackbar';
import {eventStream} from './notificator';
import { FontIcon } from 'material-ui';
import {lightGreen500} from 'material-ui/styles/colors';

export class Notification extends React.Component<any, any> {

    sub: any;

    constructor(props : any) {
        super(props);
        this.state = {
            autoHideDuration: 4000,
            message: '',
            open: false
        };
    }

    componentDidMount = () => {
        this.sub = eventStream.subscribe(
            (x) => {
                var element = <span>{x}  <FontIcon color={lightGreen500} className="fa fa-check" /></span>;
                this.setState({
                    message: element,
                    open: true
                });
                this.render();
            });
    }

    componentWillUnmount = () => {
        this.sub.dispose();
    }


    handleActionTouchTap = () => {
        this.setState({open: false});
    }



    handleRequestClose = () => {
        this.setState({open: false});
    }

    render() {
        return (
                <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    action="close"
                    autoHideDuration={this.state.autoHideDuration}
                    onActionTouchTap={this.handleActionTouchTap}
                    onRequestClose={this.handleRequestClose}
                />
        );
    }
}

export default Notification;