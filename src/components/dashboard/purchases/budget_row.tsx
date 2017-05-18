import * as React from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';

export class BudgetRow extends React.Component<any,
  any> {

  constructor(props: any) {
    super(props);
    this.state = {
      budgetItem: this.props.budgetItem
    };
  }

  render() {
    return (
      <TableRow>
        <TableRowColumn>{this.state.budgetItem.username}</TableRowColumn>
        <TableRowColumn>{this.state.budgetItem.amount}</TableRowColumn>
        <TableRowColumn
          style={this.state.budgetItem.differential < 0
            ? {
              color: '#D32F2F'
            }
            : {
              color: 'green'
            }}
        >
          <b>{this.state.budgetItem.differential < 0 ? '' : '+'}{this.state.budgetItem.differential}</b>
        </TableRowColumn>
      </TableRow>
    );

  }

}

export default BudgetRow;
