import * as React from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';

export class BudgetRow extends React.Component < any,
any > {

  constructor(props : any) {
    super(props);
    this.state = {
      budgetItem: this.props.budgetItem
    };
    // console.log(this.state.budgetItem.differential < 0);
  }

  render() {
    return (
      <TableRow>
        <TableRowColumn>{this.state.budgetItem.username}</TableRowColumn>
        <TableRowColumn>{this.state.budgetItem.amount}</TableRowColumn>
        <TableRowColumn
          style={this.state.budgetItem.differential < 0
          ? {
            background: 'red'
          }
            : {}}
        >
          {this.state.budgetItem.differential}
        </TableRowColumn>
      </TableRow>
    );

  }

}

export default BudgetRow;
