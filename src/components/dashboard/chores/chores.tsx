import * as React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';
import {choreStream} from '../../../store/state_observable';

import {ChoreComponent} from './chore';
import {Link} from 'react-router-dom';

export class Chores extends React.Component<any,
  any> {

  sub: any;

  constructor(props: any) {
    super(props);
    this.state = {
      chores: this.props.chores,
      user: this.props.user
    };
  }

  render() {
    if ( this.state.chores.length > 0) {
    var choreNodes = this
      .state
      .chores
      .map((chore: any, index: any) => (<ChoreComponent i={index} key={index} chore={chore} user={this.state.user} />), this);
    return (
      <div className="dashboard-large-item">
        <h2 className="dashboard-item-title">Chores</h2>
        {choreNodes}
      </div>);
    } else {
      return (
        <div className="dashboard-large-item">
          No chores yet, add them at <Link to='/new_chore'>New Chore</Link> if you're an admin.  
        </div>
      );
    }
  }
}

/*
 <Table>
 <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
 <TableRow>
 <TableHeaderColumn>Chore</TableHeaderColumn>
 <TableHeaderColumn>Last done</TableHeaderColumn>
 <TableHeaderColumn>By</TableHeaderColumn>
 <TableHeaderColumn>Do</TableHeaderColumn>
 </TableRow>
 </TableHeader>
 <TableBody>
 {choreNodes}
 </TableBody>
 </Table>
 */