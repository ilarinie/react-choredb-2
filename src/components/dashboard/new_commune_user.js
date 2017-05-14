import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { post } from '../../services/api_service';


export class NewCommuneUser extends Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    post('communes/add_user', JSON.stringify({username: document.getElementById('add-user-username-field').value}), (err, res) => {
      if (!err) {
        console.log(res);
      } else {
        console.log(err);
      }
    });
  }


  render() {
    return (
      <div className="form-component-container">
        <form onSubmit={this.handleSubmit}>
          <TextField
            hintText="Username to add"
            id="add-user-username-field"
          /><br />
          <RaisedButton label="Find" type="submit" />
        </form>
      </div>
    );
  }

}

export default NewCommuneUser;
