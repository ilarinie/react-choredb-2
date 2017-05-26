import * as React from 'react';
import {UserList} from "./users";
import {NewCommuneUser} from "./new_commune_user";
import {ChoreForm} from "../chores/chore_form";
import {EditCommune} from "./edit_commune";


export class AdminPanel extends React.Component<any, any> {


    constructor(props: any) {
        super(props);
        this.state = {
            mainState: this.props.mainState
        }
    }


    render() {
        return (
            <div className="dashboard-large-item">
                <h1>Admin tools</h1>
                <h2>Add Chores</h2>
                <ChoreForm chore={{}} />
                <h2>Add Users</h2>
                <NewCommuneUser />
                <h2>Edit commune details</h2>
                <EditCommune commune={this.state.mainState.commune} />
                <h2>Remove users</h2>
                <UserList users={this.state.mainState.commune_users} user={this.state.mainState.current_user} />

            </div>
        )
    }


}