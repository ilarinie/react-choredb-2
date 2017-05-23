import * as React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Register} from './register';
import {Tabs, Tab} from 'material-ui/Tabs';
import './login.css';
import ApiService from '../../services/api_service';
import {login} from "../../store/state_observable";
import {LoadingScreen} from "../utils/loading_screen";

export class Login extends React.Component < any,
any > {

  constructor(props : any) {
    super(props);
    this.state = {
      value: 'login',
      logging: false,
      error: null
    };
    this.login = this.login.bind(this);
  }

  handleChange = (value : any) => {
    this.setState({value: value});
  }
  
  login = (event : any) => {
    event.preventDefault();
    this.setState({logging: true});
    let username = (document.getElementById('username')as HTMLInputElement).value;
    let password = (document.getElementById('password')as HTMLInputElement).value;
    ApiService.authenticate(username, password).then(() => {
      login();
    }).catch((error) => {
      this.setState({logging: false});
      this.setState({error: error});
    })
  }

  callBack = (err : any, response : any) => {
    if (!err) {
      console.log("kutsuu")
      login();
    } else {
      this.setState({logging: false});
      this.setState({error: err});
    }
  }

  render() {
    return (
      <div className="login-container">
        <div className="banner">
          <h1>ChoreDB 2.0</h1>
        </div>
        <Tabs value={this.state.value} onChange={this.handleChange}>
          <Tab label="Log in" value="login">
            <div className="login-container">
              {this.state.logging
                ? <LoadingScreen message="Logging in..." />
                : <div>
                  <h1>Please log in</h1>
                  <form onSubmit={this.login}>
                    <TextField hintText="Username" id="username"/><br/>
                    <TextField hintText="Password" id="password" type="password"/><br/>
                    <div className="auth-failure">{this.state.error}</div>
                    <RaisedButton label="Log in" type="submit" fullWidth={true}/>
                  </form>
                </div>}

            </div>
          </Tab>
          <Tab label="Register" value="register">
            <Register/>
          </Tab>
        </Tabs>
      </div>
    );
  }

}

export default Login;
