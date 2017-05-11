import React, {
    Component
} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './login.css';
import { register } from '../../auth/auth_service';

export class Register extends Component {


  callBack(err, response) {
    if (err){
      console.error("Error in registration");
    }else {
      console.log("Succesfully registered");
    }
  }

  register() {
    register(document.getElementById("regUsername").value, document.getElementById("regPassword").value, this.callBack)
  }

  render() {
    return (
      <div className="login-container">
        <h1>Enter your desired credentials</h1>
        <TextField
          hintText="Username" id="regUsername"
        /><br/>
        <TextField
          hintText="Password" id="regPassword"
        /><br />
      <RaisedButton label="Register" fullWidth={true} onClick={() => this.register()} />
      </div>
    );
  }

}

export default Register;
