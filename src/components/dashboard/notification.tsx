import * as React from 'react';
import Snackbar from 'material-ui/Snackbar';

export class Notification extends React.Component<any, any> {

    constructor(props : any) {
        super(props);
        this.state = {
            autoHideDuration: 4000,
            message: this.props.message,
            open: true
        };
    }

    handleTouchTap = () => {
        this.setState({open: true});
    }

    handleActionTouchTap = () => {
        this.setState({open: false});
    }

    handleChangeDuration = (event: any) => {
        const value = event.target.value;
        this.setState({
            autoHideDuration: value.length > 0
                ? parseInt(value, 10)
                : 0
        });
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