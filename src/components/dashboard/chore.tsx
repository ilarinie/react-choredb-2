import * as React from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import {completeChore} from '../../services/api_service';

export class Chore extends React.Component < any,
any > {

  constructor(props : any) {
    super(props);
    this.state = {
      chore: this.props.chore,
      user: this.props.user,
      done: false,
      late: false
    };

  }

  componentDidMount = () => {
    this.isChoreLate(this.state.chore);
  }

  isChoreLate = (chore : any) => {
    if (chore.lastdone) {
      if (new Date().getTime() > new Date(chore.lastdone).getTime() + chore.priority * 60 * 1000) {
        this.setState({late: true});
      }
    }
  }

  completeChoreHandler = () => {
    completeChore(this.state.chore, (err : any, res : any) => {
      if (!err) {
        this.markChoreDone();
      } else {
        // console.log(err);
      }
    });
  }

  markChoreDone = () => {
    var newChore = this.state.chore;
    newChore.lastdone = new Date().toString();
    newChore.lastdoer = this.state.user.username;
    this.setState({chore: newChore, done: true, late: false});
  }

  render() {
    return (
      <TableRow
        style={this.state.late
        ? {
          background: 'red'
        }
          : {}}
      >
        <TableRowColumn>{this.state.chore.chorename}</TableRowColumn>
        <TableRowColumn>{this.state.chore.lastdoer}</TableRowColumn>
        <TableRowColumn>{this.state.chore.lastdoer
            ? new Date(this.state.chore.lastdone).toLocaleString()
            : ''}</TableRowColumn>
        <TableRowColumn>
          {this.state.done
            ? <RaisedButton disabled={true} label="X"/>
            : <RaisedButton label="Do" onClick={this.completeChoreHandler}/>}
        </TableRowColumn>
      </TableRow>
    );
  }
}
