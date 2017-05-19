import * as React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import * as moment from 'moment';
import { TablePagination } from 'react-pagination-table';

export class ChoreInfo extends React.Component < any,
any > {

    headers: any = ['User', 'At'];


    render() {
        if (this.props.chore.tasks) {
            this.props.chore.tasks.sort((a, b) => {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            });

            var tasks = this.props.chore.tasks.map((task: any, index: any) => ( <li key={index}>{task.username} - {moment(task.created_at).fromNow()}</li> ), this);
        }
        return (
            <div className="dashboard-large-item">
                <h1>{this.props.chore.chorename} info page.</h1>
                <p>{this.props.chore.tasks ?  <p>{this.props.chore.chorename} has been done {this.props.chore.tasks.length} times </p> : <p>No tasks as of yet.</p> } </p>
                <ChoreTable header={this.headers} data={this.props.chore.tasks} />
            </div>
        );
    }
}
const Header = ['User', 'At'];

const ChoreTable = ({...props}) => {
    return (
        <div>
            <TablePagination
                title="Tasks"
                headers={props.header}
                data={props.data}
                columns="username.created_at"
                perPageItemCount={2}
                totalCount={props.data.length}
            />

        </div>
    );
}