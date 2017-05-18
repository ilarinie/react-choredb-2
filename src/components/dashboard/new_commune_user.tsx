import * as React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ApiService from '../../services/api_service';
import { updateMessage } from './notificator/notificator';
import Paper from 'material-ui/Paper';

export class NewCommuneUser extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    let data: any;
    data = { username: (document.getElementById('add-user-username-field') as HTMLInputElement).value };

    ApiService.send('POST', 'communes/add_user', JSON.stringify(data), (err : any, res : any) => {
      if (!err) {
        updateMessage('New user added');
      } else {
        updateMessage(err);
      }
    });
  }

  render() {
    return (
      <div className="form-component-container">
        <h1>Add a user to the commune</h1>
        <p>
          Ask your commune members to register and user account and afterwards
          to tell you their username, so that you can add them to the commune.
        </p>
        <form onSubmit={this.handleSubmit}>
        <Paper zDepth={2}>
          <TextField
            hintText="Username to add"
            className="small-form-input"
            underlineShow={false}  
            id="add-user-username-field"
          /><br />
        </Paper><br />
        <div style={{ margin: '0 auto', textAlign: 'center' }}>  
          <RaisedButton label="Find" type="submit" />
        </div>
        </form>
      
      </div>
    );
  }

}

export default NewCommuneUser;
