import * as React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { post } from '../../services/api_service';

export class NewCommuneUser extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    let data: any;
    data = { username: (document.getElementById('add-user-username-field') as HTMLInputElement).value };

    post('communes/add_user', JSON.stringify(data), (err: any, res: any) => {
      if (!err) {
        // console.log(res);
      } else {
        // console.log(err);
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
