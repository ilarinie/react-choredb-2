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
//import { Chore } from './chore';
import { completeChore } from '../../services/api_service';

export class Chores extends Component {


  constructor(props){
    super(props);
    this.state = {
       chores: this.props.chores
    }
  }
  getInitialState() {
    return {}
  }

  completeChoreHandler(chore){
    console.log(chore);
    completeChore(chore, (err, res) => {
      if (!err){
        var newChores = this.state.chores;
        for (var i = 0; i < newChores.length; i++){
          if (newChores[i].chore_id === chore.chore_id) {
            newChores[i].lastdone = new Date().toString();
          }
        }
        this.setState({chores: newChores});
      } else {
        console.log(err);
      }
    });
  }


  render() {
    var choreNodes = this.state.chores.map( (chore, index) => (
        <TableRow key={index} >
          <TableRowColumn>{chore.name}</TableRowColumn>
          <TableRowColumn>{chore.lastdone}</TableRowColumn>
          <TableRowColumn><button id={chore.id} value={chore.id} label="Do" onClick={this.completeChoreHandler.bind(this, chore)} > Do </button></TableRowColumn>
        </TableRow>
      ), this);

    return (
      <div>
      <h2 className="dashboard-item-title">Chores</h2>
      <Table selectable={false}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Chore</TableHeaderColumn>
            <TableHeaderColumn>Last done</TableHeaderColumn>
            <TableHeaderColumn>Do</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {choreNodes}
        </TableBody>
      </Table>
    </div>
    );
  }



}
