import * as React from 'react';
import {ChangePassword} from "./change_password";

export class Profile extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            user: this.props.user
        };
    }

    render() {
        return (
            <div className="dashboard-large-item">
                <h1>Hello, {this.state.user.username}</h1>
                <ChangePassword user={this.state.user}/>
            </div>
        );
    }

}