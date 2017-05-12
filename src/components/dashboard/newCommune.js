import React, {
    Component
} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class NewCommune extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: this.props.user
    }
  }

  handleClick = () => {
    console.log("clickd")
    var data = JSON.stringify({commune_name: document.getElementById('commune_name').value});
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/communes");
    xhr.setRequestHeader("Authorization", "JWT " + localStorage.getItem("token"));
    xhr.onreadystatechange = function(event) {

      if (xhr.readyState === 4){
        console.log(event);
      }
    }
    xhr.send(data);


  }

  render() {
    return (
      <div className="login-container">
        <div className="title-container">
            <h2>Welcome to ChoreDB</h2>
        </div>
        <div className="info-content">
          <p>You now have two options, either create a brand new commune, or join an existing one.</p>
          <div className="new-commune-section">
            <h3>Joining an existing commune</h3>
            <p>To join an existing commune, please contact and admin of the commune and ask them to add you to the commune.</p>
            <h3>Your username is <span className="username-span">{this.props.user.username}</span>.</h3>
          </div>
          <div className="new-commune-section">
            <h3>Creating a new commune</h3>
            <p>To create a new commune, type the desired name below and hit 'Create'</p>
            <TextField id="commune_name" hintText="Commune name" /> <br />
            <RaisedButton label="submit" onClick={this.handleClick.bind(this)} />
          </div>
        </div>
      </div>

    )
  }

}

export default NewCommune;
