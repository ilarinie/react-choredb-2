import * as React from 'react';
import {MuiThemeProvider, lightBaseTheme} from 'material-ui/styles';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './App.css';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';

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
            <MuiThemeProvider muiTheme={lightMuiTheme}>
              <Dashboard />
            </MuiThemeProvider>
          </div>
        );
      } else {
        return (
          <div className="main-container">
            <MuiThemeProvider muiTheme={lightMuiTheme}>
              <Login />
            </MuiThemeProvider>
          </div>
        );
      }
    }
}

export default App;
