import React, {
    Component
} from 'react';
import TextField from 'material-ui/TextField';
import { Register } from './register';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import './login.css';
import { authenticate } from '../../auth/auth_service';

export class Login extends Component {

  constructor(props) {
   super(props);
   this.state = {
     value: 'login',
   };
 }

 handleChange = (value) => {
   this.setState({
     value: value,
   });
 };

  callBack = (err, response) => {
    if (err){
      console.error("errori");
    }else {
      location.reload();
      console.log("success");
    }
  }

  login() {
    authenticate(document.getElementById("username").value, document.getElementById("password").value, this.callBack)
  }

  render() {
    return (
      <div className="login-container">
        <div className="banner">
          <h1>ChoreDB 2.0</h1>
        </div>
      <Tabs value={this.state.value}
            onChange={this.handleChange}
      >
      <Tab label="Log in" value="login">
        <div className="login-container">
        <h1>Please log in</h1>
        <TextField
          hintText="Username" id="username"
        /><br/>
        <TextField
          hintText="Password" id="password"
        /><br />
      <RaisedButton label="Log in" fullWidth={true} onClick={() => this.login()} />
        </div>
      </Tab>
      <Tab label="Register" value="register">
        <Register />
      </Tab>
      </Tabs>
      </div>
    );
  }

}

export default Login;
