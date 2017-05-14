import React, {
    Component
} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import { completeChore } from '../../services/api_service';

export class Chore extends Component {

  constructor(props){
    super(props);
    this.state = {
      chore: this.props.chore,
      user: this.props.user,
      done: false,
      late: false
    }

  }

  componentDidMount = () => {
      this.isChoreLate(this.state.chore);
  }


  isChoreLate = (chore) => {
    if ( chore.lastdone ){
      if (new Date().getTime() > new Date(chore.lastdone).getTime() + chore.priority * 60 * 1000){
        this.setState({late: true});
      }
    }
  }

  completeChoreHandler = () => {
      completeChore(this.state.chore, (err, res) => {
        if (!err){
          this.markChoreDone();
        } else {
          console.log(err);
        }
      });
  }

  markChoreDone = () => {
    var newChore = this.state.chore;
    newChore.lastdone = new Date().toString();
    newChore.lastdoer =  this.state.user.username;
    this.setState({
      chore: newChore,
      done: true
    });
  }


  render() {
    return (
       <TableRow style={this.state.late ? {background: "red"} : {} }>
        <TableRowColumn>{this.state.chore.chorename}</TableRowColumn>
        <TableRowColumn>{this.state.chore.lastdoer}</TableRowColumn>
        <TableRowColumn>{ this.state.chore.lastdoer ? new Date(this.state.chore.lastdone).toLocaleString() : "" }</TableRowColumn>
        <TableRowColumn>
          { this.state.done ? <RaisedButton disabled={true} label="X" /> : <RaisedButton label="Do" onClick={this.completeChoreHandler} /> }
        </TableRowColumn>
      </TableRow>
    )
  }
}
