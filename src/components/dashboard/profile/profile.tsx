import * as React from 'react';
import {ChangePassword} from "./change_password";
import {Tab, Tabs} from "material-ui";
import {PurchaseList} from "../purchases/purchase_list";
import * as moment from 'moment';
import {ChangeInfo} from "./change_info";

const TaskRow = ({...props}) => {
    return (
        <p>{props.task.name + ' ' + moment(props.task.created_at).fromNow()}</p>
    );
};

export class Profile extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            mainState: this.props.mainState,
            value: 'info'
        };
    }

    handleChange = (value) => {
        this.setState({
            value: value
        });
    }


    render() {
        var tasks = this.state.mainState.current_user.tasks.slice(0, 10).map((task: any, index: any) => (<TaskRow key={index} task={task} />), this);

        return (
            <div className="dashboard-large-item">
                <h1>Hello, {this.state.mainState.current_user.name ? this.state.mainState.current_user.name : this.state.mainState.current_user.username }</h1>
                <Tabs value={this.state.value} onChange={this.handleChange}>
                    <Tab label="Change Password" value="password">
                        <ChangePassword user={this.state.mainState.current_user}/>
                    </Tab>
                    <Tab label="Change Info" value="info">
                        <ChangeInfo user={this.state.mainState.current_user} />
                    </Tab>
                    <Tab label="Purchases" value="purchases">
                        <PurchaseList user={this.state.mainState.current_user} purchases={this.state.mainState.current_user.purchases} />
                    </Tab>
                    <Tab label="Completed Chores" value="chores">
                        {tasks}
                    </Tab>
                </Tabs>
            </div>
        );
    }

}