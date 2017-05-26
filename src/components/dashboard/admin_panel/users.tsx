import * as React from 'react';
import {fetchUsers} from "../../../store/state_observable";
import {Card, CardHeader, CardActions, RaisedButton, CardText} from "material-ui";
import {ApiService} from "../../../services/api_service";
import {updateMessage} from "../notificator/notificator";

const UserCard = ({...props}) => {
    return (
        <Card>
            <CardHeader
                title={props.user.username}
                subtitle={props.user.user_id}
                showExpandableButton={true}
                actAsExpander={true}

            />
            <CardActions>
                { props.deleteDisabled && props.user.admin ? <span/> : <RaisedButton label="REMOVE" onClick={props.delete.bind(null, props.user)}/> }
            </CardActions>
            <CardText expandable={true}>
                <p>Has done {props.user.tasks.length} tasks.</p>
                <p>Has made {props.user.purchases.length} purchases.</p>
            </CardText>
        </Card>
    );
};

export class UserList extends React.Component<any, any> {


    constructor(props: any) {
        super(props);
        this.state = {
            users: this.props.users,
            user: this.props.user
        };
    }



    handleDelete = (user) => {
        if (confirm('Are you user you want to remove ' + user.username + '?')) {
            ApiService.send('DELETE', 'users/' + user.user_id, null, (err, res) => {
                if (!err) {
                    updateMessage("User removed succesfully.");
                    fetchUsers();
                } else {
                    updateMessage("Something went wrong");
                }
            });
        }
    }

    render() {
        if (this.state.users) {
            let users = this.state.users.map((user: any, index: any) => (<UserCard key={index} user={user} delete={this.handleDelete} deleteDisabled={user.user_id === this.state.user.user_id}/>), this);
            return (
                <div className="dashboard-large-item">
                    {users}
                </div>
            );
        } else {
            return (
                <div>Loading..</div>
            );
        }
    }


}

