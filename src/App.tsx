import * as React from 'react';
import {MuiThemeProvider} from 'material-ui/styles';
import './App.css';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';
import  Theme  from './theme/theme';

function authenticated() {
  if (localStorage.getItem('token') === null) {
    return false;
  }
  return true;
}

class App extends React.Component<{}, null> {
    render() {
      if (authenticated()) {
        return (
          <div className="main-container">
            <MuiThemeProvider muiTheme={Theme}>
              <Dashboard />
            </MuiThemeProvider>
          </div>
        );
      } else {
        return (
          <div className="main-container">
            <MuiThemeProvider muiTheme={Theme}>
              <Login />
            </MuiThemeProvider>
          </div>
        );
      }
    }
}

export default App;
