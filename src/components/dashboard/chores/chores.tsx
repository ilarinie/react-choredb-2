import * as React from 'react';

import {ChoreComponent} from './chore';
import {Link} from 'react-router-dom';

export class Chores extends React.Component<any,
  any> {


  constructor(props: any) {
    super(props);
    this.state = {
      mainState: this.props.mainState
    };
  }

  render() {
    if ( this.state.mainState.chores.length > 0) {
    var choreNodes = this.state.mainState.chores.map((chore: any, index: any) => (<ChoreComponent i={index} key={index} chore={chore} current_user={this.state.mainState.current_user} />), this);
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

