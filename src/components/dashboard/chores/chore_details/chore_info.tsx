import * as React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import * as moment from 'moment';
import { TablePagination } from 'react-pagination-table';

export class ChoreInfo extends React.Component < any, any > {

    constructor(props: any) {
        super(props);
        this.state = {
            modifiedTasks: this.modifyTasks(this.props.chore.tasks)
        };
    }

    modifyTasks = (tasks) => {
        var newTasks = tasks;
        newTasks.sort((a, b) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        })
        for (let i = 0; i < tasks.length; i++) {
            newTasks[i].created_at = moment(tasks[i].created_at).fromNow();
        }
        return newTasks;
    }



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
                <p>{this.props.chore.tasks ?  this.props.chore.chorename + ' has been done ' + this.props.chore.tasks.length + ' times'  : 'No tasks as of yet.' } </p>
                <ChoreTable data={this.state.modifiedTasks} />
            </div>
        );
    }
}

const ChoreTable = ({...props}) => {
    return (
        <div>
            <TablePagination
                title="Latest completions:"
                headers={[]}
                data={props.data}
                columns="username.created_at"
                perPageItemCount={10}
                totalCount={props.data.length}
            />

        </div>
    );
}