import * as React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';
import {choreStream} from '../../../store/state_observable';

import {ChoreComponent} from './chore';

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

  componentDidMount = () => {
    /*  this.sub = choreStream.subscribe(
      (chores) => {
          this.setState({
            chores: chores
          });
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('muu');
      }
    ); */
  }
  componentWillUnmount() {
    //this.sub.dispose();
  }

  render() {
    var choreNodes = this
      .state
      .chores
      .map((chore: any, index: any) => (<ChoreComponent key={index} chore={chore} user={this.state.user} />), this);

    return (
      <div className="dashboard-large-item">
        <h2 className="dashboard-item-title">Chores</h2>
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
      </div>)
  }
}