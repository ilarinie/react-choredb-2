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
export class ChoreComponent extends React.Component < any,
any > {

  constructor(props : any) {
    super(props);
    this.state = {
      chore: this.props.chore,
      user: this.props.user,
      justDone: (new Date().getTime() < new Date(this.props.chore.lastdone).getTime() + 20000),
      done: false,
      late: (new Date().getTime() > new Date(this.props.chore.lastdone).getTime() + this.props.chore.priority * 60000),
      loading: false
    };

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

      return (
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
      );
    } else {
      return (
        <div>No chores here yet</div>
      );
    }
  }
}
