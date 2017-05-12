import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class NewChore extends Component {

  constructor(props){
    super(props);
  }

  handleClick = () => {
    console.log("jea")
  }

  render() {
    return (
      <div className="login-container">
        <TextField hintText="Chore name" id="chore_name_input" /><br/>
        <RaisedButton label="Create" onClick={this.handleClick} />
      </div>
    )
  }

}

export default NewChore;
