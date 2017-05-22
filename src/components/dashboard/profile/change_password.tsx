import * as React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Divider, Paper} from "material-ui";
import {ApiService} from "../../../services/api_service";
import {updateMessage} from "../notificator/notificator";


export class ChangePassword extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            user: this.props.user,
            password: '',
            password_confirmation: '',
            error: null
        };
    }

    onSubmit = (event: any) => {
        event.preventDefault();
        if (this.state.password === '' || this.state.password_confirmation === '') {
            this.setState({
                error: 'Empty inputs.'
            });
        } else if (this.state.password !== this.state.password_confirmation) {
            this.setState({
                error: 'Passwords dont match'
            });
        } else {
            ApiService.changePassword(this.state.password, (err, res) => {
                if (!err) {
                    updateMessage("Password changed succesfully");
                    this.clearInputs();
                } else {
                    updateMessage("Error happened");
                }
            });
        }
    }

    clearInputs = () => {
        this.setState({
            password: '',
            password_confirmation: ''
        });
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
        if (this.state.password !== event.target.value) {
            this.setState({
                error: 'Passwords dont match'
            });
        } else {
            this.setState({
                error: ''
            });
        }
    }


    render () {
        return (
            <div className="form-component-container">
                <h2>Change your password</h2>
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