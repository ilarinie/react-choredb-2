import * as React from 'react';
import TextField from 'material-ui/TextField';
import { Register } from './register';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import './login.css';
import { authenticate } from '../../services/api_service';

export class Login extends React.Component<any, any> {

  constructor(props: any) {
   super(props);
   this.state = {
     value: 'login',
     logging: false,
     error: null
   };
   this.login = this.login.bind(this);
 }

 handleChange = (value: any) => {
   this.setState({
     value: value
   });
 }

  callBack = (err: any, response: any) => {
    this.setState({logging: false});
    if (!err) {
      var parsedRes = JSON.parse(response);
      localStorage.setItem('token', parsedRes.token);
      location.reload();
    } else {
      var parsedErr = JSON.parse(err);
      this.setState({error: parsedErr.message});
    }
  }

  login = (event: any) => {
    event.preventDefault();
    this.setState({logging: true});
    let username = (document.getElementById('username') as HTMLInputElement).value;
    let password = (document.getElementById('password') as HTMLInputElement).value;
    authenticate(username, password, this.callBack);
  }

  completeRegistration = (e: any) => {
    // console.log('asd');
  }

  render() {
    return (
      <div className="login-container">
        <div className="banner">
          <h1>ChoreDB 2.0</h1>
        </div>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Tab label="Log in" value="login">
            <div className="login-container">
            { this.state.logging ? <div>Logging in..</div> :
              <div><h1>Please log in</h1>
                <form onSubmit={this.login}>
                  <TextField
                          hintText="Username"
                          id="username"
                  /><br/>
                  <TextField
                    hintText="Password"
                    id="password"
                    type="password"
                  /><br />
                  <div className="auth-failure">{this.state.error}</div>
                  <RaisedButton label="Log in" type="submit" fullWidth={true}  />
                  </form>
              </div>}

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
