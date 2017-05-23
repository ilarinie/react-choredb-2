import * as React from 'react';
import {Paper, RaisedButton, TextField} from "material-ui";
import {updateMessage} from '../notificator/notificator';
import {User} from "../../../models/user";
import {ApiService} from "../../../services/api_service";
import {fetchCurrentUser} from "../../../store/state_observable";


export class ChangeInfo extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            user: this.props.user
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let value = (document.getElementById('user-name-input') as HTMLInputElement).value;
        if (!value && value !== '') {
            updateMessage('You must enter a valid name');
        } else {
            let user: User = this.state.user;
            user.name = value;
            ApiService.updateUser(user).then((promise) => {
                updateMessage('Your info updated succesfully');
                fetchCurrentUser();
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    render() {
        return (
            <div className="form-component-container">
                <h2>Change your display name</h2>
                <form onSubmit={this.handleSubmit} >
                    <Paper zDepth={2}>
                        <TextField
                            defaultValue={this.state.user.name ? this.state.user.name : ''}
                            hintText="Display name"
                            id="user-name-input"
                            underlineShow={false}
                            className="small-form-input"
                        />
                    </Paper>
                    <RaisedButton label="Change name" type="submit" />
                </form>

            </div>
        )
    }
}