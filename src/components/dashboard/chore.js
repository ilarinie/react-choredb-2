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

export class Chore extends Component {

  render() {
    return (
      <TableRow>
        <TableRowColumn>Tiskit</TableRowColumn>
        <TableRowColumn>nevö</TableRowColumn>
        <TableRowColumn><RaisedButton label="Do" /> </TableRowColumn>
      </TableRow>
    )
  }
}
