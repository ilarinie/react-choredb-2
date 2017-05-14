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

import { Chore } from './chore';

export class Chores extends Component {


  constructor(props){
    super(props);
    this.state = {
       chores: this.props.chores,
       user: this.props.user
    }
  }


  render() {
    var choreNodes = this.state.chores.map( (chore, index) => (
        <Chore key={index} chore={chore} user={this.state.user}/>
      ), this);

    return (
      <div>
      <h2 className="dashboard-item-title">Chores</h2>
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Chore</TableHeaderColumn>
            <TableHeaderColumn>Last done by</TableHeaderColumn>
            <TableHeaderColumn>Last done at</TableHeaderColumn>
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
