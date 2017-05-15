import * as React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './login.css';
import {register} from '../../services/api_service';

export class Register extends React.Component < any,
any > {

  constructor(props : any) {
    super(props);
    this.state = {
      registering: false,
      registered: null,
      error: null
    };
  }

  callBack = (e : any) => {
    this.setState({registering: false});
    if (e) {
      this.setState({registered: null, error: e});
    } else {
      this.setState({registered: 'Registered succesfully, you can now log in.', error: null});
    }
  }

  register() {
    this.setState({registering: true, registered: 'Loading..'});
    let username = (document.getElementById('regUsername')as HTMLInputElement).value;
    let password = (document.getElementById('regPassword')as HTMLInputElement).value;
    let passwordConfirmation = (document.getElementById('regPasswordConf')as HTMLInputElement).value;

    if (password === passwordConfirmation) {
      register(username, password, this.callBack);
    } else {
      // handle error
    }
  }

  render() {

    if (this.state.registered) {
      return <div className="login-container registration-success">Registration succesfull, you can now log in</div>;
    } else {
      return (
        <div className="login-container">
          <h1>Enter your desired credentials</h1>

          {this.state.registering
            ? <div className="registration-success">Loading..</div>
            : <div><TextField hintText="Username" id="regUsername"/><br/>
              <TextField hintText="Password" id="regPassword"/><br/>
              <TextField hintText="Password Confirmation" id="regPasswordConf"/><br/>
              <RaisedButton
                label="Register"
                fullWidth={true}
                onClick={() => this.register()}/>
            </div>}
          <div className="auth-failure">{this.state.error}</div>
        </div>
      );
    }
  }

}

export default Register;
