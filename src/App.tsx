import * as React from 'react';
import {MuiThemeProvider} from 'material-ui/styles';
import './App.css';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';
import  Theme  from './theme/theme';
import {fetchCommune, getInitialState, mainStream} from "./store/state_observable";
import {State} from "./models/state";


class App extends React.Component<{}, any> {

    sub: any;
    constructor(props: any) {
        super(props);

        this.state = {
            mainState: null
        };
    }

    componentDidMount = () => {
        this.sub = mainStream.subscribe(
            (mainState: State) => {
                this.setState({
                    mainState: mainState
                });
            }
        );
        getInitialState();
    }

    componentWillUnmount = () => {
        this.sub.dispose();
    }

    onBackButtonEvent = (e) => {
        e.preventDefault();
    }



    render() {
        let content;
        if (this.state.mainState && this.state.mainState.loggedIn) {
            content = <Dashboard mainState={this.state.mainState} />;
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
