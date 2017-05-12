import React, {
    Component
} from 'react';
import TextField from 'material-ui/TextField';
import { Register } from './register';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import './login.css';
import { authenticate } from '../../services/api_service';

export class Login extends Component {

  constructor(props) {
   super(props);
   this.state = {
     value: 'login',
     logging: false,
     error: null
   };
 }

 handleChange = (value) => {
   this.setState({
     value: value
   });
 };

  callBack = (err, response) => {
    this.setState({logging: false});
    if (!err) {
      var parsedRes = JSON.parse(response);
      localStorage.setItem("token", parsedRes.token);
      location.reload();
      console.log("success");
    } else {
      var parsedErr = JSON.parse(err);
      this.setState({error: parsedErr.message});
      console.error(err);
    }
  }

  login() {
    this.setState({logging: true});
    authenticate(document.getElementById("username").value, document.getElementById("password").value, this.callBack)
  }

  completeRegistration = (e) =>{
    console.log("asd")
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
        { this.state.logging ? <div>Logging in..</div> : <div><h1>Please log in</h1>
        <TextField
          hintText="Username" id="username"
        /><br/>
        <TextField
          hintText="Password" id="password"
        /><br />
        <div className="auth-failure">{this.state.error}</div>
      <RaisedButton label="Log in" fullWidth={true} onClick={() => this.login()} /> </div>}
        </div>
      </Tab>
      <Tab label="Register" value="register">
        <Register callBack={() => this.completeRegistration.bind(this)}/>
      </Tab>
      </Tabs>
      </div>
    );
  }

}

export default Login;
