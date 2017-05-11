import React, {
    Component
} from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './App.css';



import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';

function authenticated() {
  if (localStorage.getItem('token') === null){
    return false;
  }
  return true;
}

class Base extends Component {
    render() {
      if (authenticated()){
        return (
          <div className="main-container">
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
              <Dashboard />
            </MuiThemeProvider>
          </div>
        );
      } else {
        return (
          <div className="main-container">
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
              <Login />
            </MuiThemeProvider>
          </div>
        );
      }
    }
}

export default Base;
