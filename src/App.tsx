import * as React from 'react';
import {MuiThemeProvider} from 'material-ui/styles';
import './App.css';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';
import  Theme  from './theme/theme';
import {metaStream} from "./store/state_observable";

function authenticated() {
  if (localStorage.getItem('token') === null) {
    return false;
  }
  return true;
}

class App extends React.Component<{}, any> {

    metaSub: any;
    constructor(props: any) {
        super(props);
        this.state = {
            loggedIn: false
        };
    }

    componentDidMount = () => {
        this.metaSub = metaStream.subscribe(
            (metaState) => {
                this.setState({
                    loggedIn: metaState.loggedIn
                });
            }
        );
    }

    render() {
        let content;
        if (this.state.loggedIn) {
            content = <Dashboard />;
        } else {
            content = <Login />;
        }

        return (
          <div className="main-container">
            <MuiThemeProvider muiTheme={Theme}>
                {content}
            </MuiThemeProvider>
          </div>
        );
    }
}

export default App;
