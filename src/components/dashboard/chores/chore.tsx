import FontIcon from 'material-ui/FontIcon';
import * as React from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import ApiService from '../../../services/api_service';
import {Chore} from '../../../models/chore';
import {updateMessage} from '../notificator/notificator';
import * as moment from 'moment';
import {Link} from 'react-router-dom';
import {fetchChores} from '../../../store/state_observable';
import {CardActions, Subheader, CardHeader, CardText, Card} from "material-ui";


const TaskRow = ({...props}) => {
  return (
      <p>{props.task.username + ' ' + moment(props.task.created_at).fromNow()}</p>
  );
}


export class ChoreComponent extends React.Component < any,
any > {

  constructor(props : any) {
    super(props);
    this.state = {
      chore: this.props.chore,
      user: this.props.user,
      lastTask: this.getLastTask(),
      justDone: this.isChoreJustDone(),
      late: this.isChoreLate(),
      done: false,
      loading: false
    };

  }

  getLastTask = () => {
    if (this.props.chore.tasks[0]) {
      return this.props.chore.tasks[0];
    }else {
      return null;
    }

  }

  isChoreJustDone = () => {
    if (this.props.chore.tasks[0]) {
      return (new Date().getTime() < new Date(this.props.chore.tasks[0].created_at).getTime() + 20000);
    } else {
      return false;
    }

  }

  isChoreLate = () => {
    if (this.props.chore.tasks[0]) {
      return (new Date().getTime() > new Date(this.props.chore.tasks[0].created_at).getTime() + this.props.chore.priority * 60000);
    } else {
      return false;
    }
  }

  completeChoreHandler = () => {
    this.setState({loading: true});
    ApiService.completeChore(this.state.chore, (err : any, res : any) => {
      this.setState({loading: false});
      if (!err) {
        updateMessage('Well done.');
        fetchChores();
        this.markChoreDone();
      } else {
        this.setState({errorObject: err});
      }
    });
  }

  markChoreDone = () => {
    var newChore = this.state.chore;
    newChore.lastdone = new Date();
    newChore.lastdoer = this.state.user.username;
    this.setState({chore: newChore, done: true, late: false});
  }

  render() {
    if (this.state.chore) {
      var button;
      if (this.state.justDone) {
        button = <RaisedButton buttonStyle={{ background: 'green', color: 'white'}} disabled={true} label="Done" icon={< FontIcon className = "fa fa-check checkmark" />}/>;
      } else {
        if (this.state.done) {
          button = <RaisedButton buttonStyle={{background: 'green', color: 'white'}} disabled={true} label="Done" icon={< FontIcon className = "fa fa-check checkmark" />}/>;
        } else if (this.state.loading) {
          button = <RaisedButton disabled={true} icon={< FontIcon className = "fa fa-check fa fa-spinner fa-spin fa-fw" />}/>;
        } else {
          button = <RaisedButton secondary={true} label="Do" onClick={this.completeChoreHandler}/>;
        }
      }
      var tasks = this.state.chore.tasks.map((task: any, index: any) => (
          <TaskRow key={index} task={task} />
      ), this);

      var done = ( this.state.lastTask ? moment(this.state.lastTask).fromNow() : 'Chore has not been done yet.');

      return (
          <Card>
            <CardHeader
                title={this.state.chore.name}
                subtitle={'Done ' + moment(this.state.lastTask.created_at).fromNow() + ' ago.'}
                actAsExpander={true}
                showExpandableButton={true}
            />
            <CardActions>
              {button}}
            </CardActions>
            <CardText expandable={true}>
              <Subheader>Last completions: </Subheader>
              {tasks}
              <RaisedButton label="Edit" />
            </CardText>
          </Card>


      );
    } else {
      return (
        <div>No chores here yet</div>
      );
    }
  }
}



/*
 <TableRow
 style={this.state.late
 ? {
 background: '#D32F2F'
 }
 : {}}>
 <TableRowColumn>
 <Link className="chore-link" to={'/chores/' + this.props.i}>{this.state.chore.chorename}</Link>
 </TableRowColumn>
 <TableRowColumn >
 {this.state.chore.lastdoer ? moment(this.state.chore.lastdone).fromNow() : ''}
 </TableRowColumn>
 <TableRowColumn>{this.state.chore.lastdoer}</TableRowColumn>
 <TableRowColumn>
 {button}
 </TableRowColumn>
 </TableRow>
 */

