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

import { getPurchases } from '../../services/api_service';


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
            <TableRow key={index} >
              <TableRowColumn>{purchase.username}</TableRowColumn>
              <TableRowColumn>{purchase.amount}</TableRowColumn>
              <TableRowColumn>{purchase.differential}</TableRowColumn>
            </TableRow>
          ), this);
      }

      return (
        <div>
        <h2 className="dashboard-item-title">Budget</h2>
        <Table>
          <TableHeader>
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
