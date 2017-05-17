import * as React from 'react';
import {MuiThemeProvider} from 'material-ui/styles';
import './App.css';
import {Dashboard} from './components/dashboard/dashboard';
import {Login} from './components/login/login';
import Theme from './theme/theme';
import { connect } from 'react-redux';

function authenticated() {
  if (localStorage.getItem('token') === null) {
    return false;
  }
  return true;
}

class App extends React.Component < any, any > {

  constructor(props : any) {
    super(props);
  }

  componentDidMount = () => {
    this.props.store.subscribe(this.render);
  } 

  authenticated = () => {
    var state = this.props.store.getState();
    return state.status.loggedIn;
  }

  render() {

    var loginScreen = (
      <div className="main-container">
        <MuiThemeProvider muiTheme={Theme}>
          <Login/>
        </MuiThemeProvider>
      </div>
    );

    var dashBoard = (
      <div className="main-container">
        <MuiThemeProvider muiTheme={Theme}>
          <Dashboard/>
        </MuiThemeProvider>
      </div>
    );

    return (
      <div>{this.authenticated()
          ? dashBoard
          : loginScreen}</div>
    );

  }
}

export default App;