import React, {
    Component
} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';
import { BudgetRow } from './budget_row';



export class Budget extends Component {

    constructor(props){
      super(props);
      this.state = {
        purchases: this.props.purchases
      }
    }


    render() {
      if (this.state.purchases) {
        var budgetNodes = this.state.purchases.map( (purchase, index) => (
          <BudgetRow key={index} budgetItem={purchase} />
          ), this);
      }

      return (
        <div>
        <h2 className="dashboard-item-title">Budget</h2>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>User</TableHeaderColumn>
              <TableHeaderColumn>Spent</TableHeaderColumn>
              <TableHeaderColumn>Differential</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.state.purchases ? budgetNodes : <div>Loading..</div>}
          </TableBody>
        </Table>
      </div>
      )
    }
}
