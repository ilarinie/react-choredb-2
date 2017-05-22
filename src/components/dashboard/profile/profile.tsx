import * as React from 'react';
import {ChangePassword} from "./change_password";
import {Tab, Tabs} from "material-ui";

export class Profile extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            user: this.props.user,
        };
    }



    render() {
        return (
            <div className="dashboard-large-item">
                <h1>Hello, {this.state.user.name ? this.state.user.name : this.state.user.username }</h1>
                <Tabs>
                    <Tab label="Change Password">
                        <ChangePassword user={this.state.user}/>
                    </Tab>
                    <Tab label="Change Info">

                    </Tab>
                    <Tab label="Purchases">

                    </Tab>
                    <Tab label="Completed Chores">
                    </Tab>
                </Tabs>
            </div>
        );
    }

}