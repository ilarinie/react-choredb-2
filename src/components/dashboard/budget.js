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


export class Budget extends Component {

    render() {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>User</TableHeaderColumn>
              <TableHeaderColumn>Spent</TableHeaderColumn>
              <TableHeaderColumn>Diff</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableRowColumn>Matti</TableRowColumn>
              <TableRowColumn>123 €</TableRowColumn>
              <TableRowColumn>-2</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Pekka</TableRowColumn>
              <TableRowColumn>234 €</TableRowColumn>
              <TableRowColumn>-12</TableRowColumn>
            </TableRow>
          </TableBody>

        </Table>
      )
    }
}
