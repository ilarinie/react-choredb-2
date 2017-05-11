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
//import { Chore } from './chore';

export class Chores extends Component {


  constructor(props){
    super(props);
    this.state = {
       chores: [{id: 1, name: "Tiskit"}, {id:2, name: "imurointi"}]
    }
  }
  getInitialState() {
    return {}
  }


  render() {
    var rows = [];
    for (var i = 0; i < this.state.chores.lenght; i++){
      rows.push(
        <TableRow>
          <TableRowColumn>{this.state.chores[i].name}</TableRowColumn>
        </TableRow>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Chore</TableHeaderColumn>
            <TableHeaderColumn>Last done</TableHeaderColumn>
            <TableHeaderColumn>Do</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.state.chores.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{index}</TableRowColumn>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.id}</TableRowColumn>
              </TableRow>
              ))}
        </TableBody>
      </Table>
    );
  }



}
