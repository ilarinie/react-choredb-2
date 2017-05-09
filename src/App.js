import React, {
    Component
} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {
    BrowserRouter as Router,
    Link,
    Route,
    withRouter
} from 'react-router-dom';
//import Route from './auth/auth_service';
import { Redirect } from 'react-router-dom';
const auth_service = require('./auth/auth_service');
import './App.css';


function validateAuthentication() {
    console.log("asd")
    var token = localStorage.getItem('token');
    if (!token){
      var token = ""
    }
    if (token) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
          console.log("aa")
        }
        xhr.onerror = function() {
          console.log("bee")
        }
        xhr.setRequestHeader("Authorization", "JWT " + token);
        xhr.open("GET", "http://localhost:3000/auth/validate_token", true);
        xhr.send();
    }
  }

class Login extends Component {
  static isPrivate = false;
  render() {
    return (
      <div className="Login">
        <button label="Login" />
      </div>
    );
  }
}

class Main extends Component {
static isPrivate = false;
    render() {
        return (
          <div className="Login">
            asdasd
          </div>
        )
    }
}

class Topics extends React.Component {
  static isPrivate = true;

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log("mount");
    var token = "";
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      console.log("asd2")
      return true;
    }
    xhr.onerror = function() {
      console.log("asd3")
      const { history } = this.props;
      history.pushState(null, '/login')
      //history.push('/login')
    }
    xhr.open("GET", "http://localhost:3000/auth/validate_token", true);
    xhr.setRequestHeader("Authorization", "JWT " + token);
    xhr.send();


  }

  render() {
    return <h1>AAAA</h1>
  }
}

class Base extends Component {
    render() {
        return (
          <Router>
            <div>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/topics">Topics</Link></li>
              </ul>

            <hr/>
            <Route exact path="/" component={Main} />
            <Route path="/topics" component={Topics} />
            <Route path="/login" component={Login}/>
          </div>
        </Router>
        );
    }
}



const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    validateAuthentication ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default Base;
