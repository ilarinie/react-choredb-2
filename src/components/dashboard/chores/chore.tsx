import FontIcon from 'material-ui/FontIcon';
import * as React from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import ApiService from '../../../services/api_service';
import { Chore } from '../../models/chore';
import { updateMessage } from '../notificator/notificator';
import * as moment from 'moment';
export class ChoreComponent extends React.Component<any,
  any> {

  constructor(props: any) {
    super(props);
    this.state = {
      chore: this.props.chore,
      user: this.props.user,
      done: false,
      late: false,
      loading: false
    };

  }

  componentDidMount = () => {
    this.isChoreLate(this.state.chore);
  }

  isChoreLate = (chore: Chore) => {
    if (chore.lastdone) {
      var isLate = false;
      if (new Date().getTime() > new Date(chore.lastdone).getTime() + chore.priority * 60 * 1000) {
        isLate = true;
      }
      chore.lastdone = moment(chore.lastdone).fromNow();
      this.setState({
        chore: chore,
        late: isLate
      })
    }
  }

  completeChoreHandler = () => {
    this.setState({
      loading: true
    });
    ApiService.completeChore(this.state.chore, (err: any, res: any) => {
      this.setState({
        loading: false
      });
      if (!err) {
        updateMessage('Well done.');
        this.markChoreDone();
      } else {
        this.setState({
          errorObject: err
        });
      }
    });
  }

  markChoreDone = () => {
    var newChore = this.state.chore;
    newChore.lastdone = new Date().toString();
    newChore.lastdone = moment(newChore.lastdone).fromNow();
    newChore.lastdoer = this.state.user.username;
    this.setState({
      chore: newChore,
      done: true,
      late: false
    });
  }

  render() {
    var button;

    if (this.state.done) {
      button =  <RaisedButton buttonStyle={{background: 'green', color:'white'}} disabled={true} label="Done" icon={<FontIcon className="fa fa-check checkmark" />} />;
    } else if (this.state.loading) {
      button = <RaisedButton disabled={true} icon={<FontIcon className="fa fa-check fa fa-spinner fa-spin fa-fw" />} />;
    } else {
      button = <RaisedButton secondary={true} label="Do" onClick={this.completeChoreHandler} />;
    }


    return (
      <TableRow
        style={this.state.late
          ? {
            background: '#D32F2F'
          }
          : {}}
      >
        <TableRowColumn><b>{this.state.chore.chorename}</b></TableRowColumn>
        <TableRowColumn > {
          this.state.chore.lastdoer
            ? this.state.chore.lastdone
            : ''
        } </TableRowColumn>
        <TableRowColumn>{this.state.chore.lastdoer}</TableRowColumn>
        <TableRowColumn>
            {button}
        </TableRowColumn>
      </TableRow>
    );
  }
}