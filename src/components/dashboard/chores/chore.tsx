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
};

const styles = {
  marginBottom: '10px',
};


export class ChoreComponent extends React.Component < any,
any > {

  constructor(props : any) {
    super(props);
    this.state = {
      chore: this.props.chore,
      user: this.props.user,
      late: this.isChoreLate(),
      done: false,
      loading: false
    };

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
        this.setState({
          done: true
        })
        fetchChores();
      } else {
        this.setState({errorObject: err});
      }
    });
  }



  render() {
    if (this.state.chore) {
      var button, justDone;
      justDone = ( this.state.chore.tasks[0] && new Date().getTime() < new Date(this.state.chore.tasks[0].created_at).getTime() + 20000);



      if (justDone) {
        button = <RaisedButton buttonStyle={{ background: 'green', color: 'white'}} disabled={true} label="Done" icon={< FontIcon className = "fa fa-check checkmark" />}/>;
      } else if (this.state.loading) {
          button = <RaisedButton disabled={true} icon={< FontIcon className = "fa fa-check fa fa-spinner fa-spin fa-fw" />}/>;
      } else {
        button = <RaisedButton secondary={true} label="Do" onClick={this.completeChoreHandler}/>;
      }

      var tasks = this.state.chore.tasks.slice(0, 10).map((task: any, index: any) => (<TaskRow key={index} task={task} />), this);
      var lastDone = ( this.state.chore.tasks[0] ? 'Done ' + moment(this.state.chore.tasks[0].created_at).fromNow() + ' ago.' : 'Chore has not been done yet.');

      return (
          <Card style={styles}>
            <CardHeader
                title={this.state.chore.name}
                subtitle={lastDone}
                showExpandableButton={true}
                actAsExpander={true}
            />
            <CardActions>
              {button}
            </CardActions>
            <CardText expandable={true}>
              <Subheader>Last completions: </Subheader>
              {tasks}
              <Link to={'/chores/' + this.props.i}>
                <RaisedButton label="Edit" />
              </Link>
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

