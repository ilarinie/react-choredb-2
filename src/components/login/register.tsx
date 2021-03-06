import * as React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './login.css';
import ApiService from '../../services/api_service';

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

  register = (event) => {
    event.preventDefault();
    this.setState({registering: true, registered: 'Loading..'});
    let username = (document.getElementById('regUsername')as HTMLInputElement).value;
    let password = (document.getElementById('regPassword')as HTMLInputElement).value;
    let passwordConfirmation = (document.getElementById('regPasswordConf')as HTMLInputElement).value;


    if (username !== '' && password === passwordConfirmation) {
      ApiService.register(username, password).then((result) => {
        console.log(result);
        this.setState({
          registering: false,
          registered: 'Registration successful, you can now log in.'
        })
      }).catch((error) => {
        this.setState({
          registering: false,
          registered: null,
          error: error.toString()
        })
      });
    } else {
      this.setState({
        registering: false,
        registered: null,
        error: "Username missing or passwords don't match."
      })
    }
  }

  render() {

    if (this.state.registered) {
      return <div className="login-container registration-success">{this.state.registered}</div>;
    } else {
      return (
        <div className="login-container">
          <h1>Enter your desired credentials</h1>

          {this.state.registering
            ? <div className="registration-success">Loading..</div>
            : <form onSubmit={this.register}>
                <TextField hintText="Username" id="regUsername"/><br/>
                <TextField hintText="Password" id="regPassword" type="password"/><br/>
                <TextField hintText="Password Confirmation" id="regPasswordConf" type="password"/><br/>
                <RaisedButton label="Register" fullWidth={true} type="submit"/>
            </form>}
          <div className="auth-failure">{this.state.error}</div>
        </div>
      );
    }
  }

}

export default Register;
