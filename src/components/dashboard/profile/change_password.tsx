import * as React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Divider, Paper} from "material-ui";


export class ChangePassword extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            user: this.props.user,
            password: '',
            password_confirmation: '',
            error: ''
        };
    }

    onSubmit = (event: any) => {
        event.preventDefault();
        if (this.state.password === '' || this.state.password_confirmation === '') {
            this.setState({
                error: 'Empty inputs.'
            });
        } else if (this.state.password !== this.state.password_confirmation){
            this.setState({
                error: 'Passwords dont match'
            });
        } else {
            // API CALl
        }
    }

    handlePasswordChange = (event: any) => {
        this.setState({
            password: event.target.value
        });
    }

    handleConfirmationChange = (event: any) => {
        this.setState({
            password_confirmation: event.target.value
        });
    }


    render () {
        return (
            <div className="form-component-container">
                <form onSubmit={this.onSubmit}>
                    <Paper zDepth={2}>
                        <TextField
                            hintText="New password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                            errorText={this.state.error}
                            underlineShow={false}
                            type="password"
                            className="small-form-input"
                        />
                        <Divider />
                        <TextField
                            hintText="New Password again"
                            value={this.state.password_confirmation}
                            onChange={this.handleConfirmationChange}
                            underlineShow={false}
                            type="password"
                            className="small-form-input"
                        />
                        <Divider />
                    </Paper>
                    <br />
                    <RaisedButton type="submit" label="Change password" />
                </form>
            </div>
        );
    }

}