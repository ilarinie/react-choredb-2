import * as React from 'react';
import {Chores} from './chores';
import {Budget} from './budget';
import {NewCommune} from './newCommune';
import {NewChore} from './new_chore';
import {NewPurchase} from './new_purchase';
import { NewCommuneUser } from './new_commune_user';
import ApiService from '../../services/api_service';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Snackbar from 'material-ui/Snackbar';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';

export class Dashboard extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            notification: null,
            commune: null,
            drawerOpen: false,
            snackBarOpen: false
        };
    }

    notifyAndReset = (message: any) => {
        this.setState({ snackBarOpen: true, notification: message });
        ApiService.getCommune(this.setCommune);
    }

    componentDidMount = () => {
        ApiService.getCommune(this.setCommune);
    }

    setCommune = (err: any, commune: any) => {
        if (!err) {
            this.setState({commune: commune});
        } else {
            localStorage.removeItem('token');
            location.reload();
        }
    }

    handleToggle = () => {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        });
    }

    handleClose = () => {
        this.setState({drawerOpen: false});
    }

    logOut = () => {
      localStorage.removeItem('token');
      location.reload();
    }

    render() {

        if (this.state.commune && this.state.commune.user) {
            if (this.state.commune.commune) {
                var adminMenuItems = (
                  <div>
                    <Divider />
                    <Link to="/new_chore"><MenuItem onTouchTap={this.handleClose}>New Chore</MenuItem></Link>
                    <Link to="/new_user"><MenuItem onTouchTap={this.handleClose}>Add User to Commune</MenuItem></Link>
                    <Divider />
                  </div>
                );

                var navigationBar =  (
                      <div>
                          <AppBar
                            title={this.state.commune.commune.name + ' || ' + this.state.commune.user.username}
                            iconClassNameRight="muidocs-icon-navigation-expand-more"
                            onLeftIconButtonTouchTap={this.handleToggle}
                          />
                          <Drawer
                              open={this.state.drawerOpen}
                              docked={false}
                              width={200}
                              onRequestChange={(open) => this.setState({open})}
                          >
                            <Link to="/">
                                <MenuItem onTouchTap={this.handleClose}>Chores</MenuItem>
                            </Link>
                            <Link to="/budget">
                                <MenuItem onTouchTap={this.handleClose}>Budget</MenuItem>
                            </Link>
                            <Link to="/new_purchase">
                                <MenuItem onTouchTap={this.handleClose}>New Purchase</MenuItem>
                            </Link>
                            {this.state.commune.user.admin ? adminMenuItems : ''}
                            <MenuItem onTouchTap={this.logOut}>Log Out</MenuItem>
                          </Drawer>
                      </div>
                      );

                return (
                  <BrowserRouter>
                    <div>
                            {navigationBar}  
                        <div className="dashboard-container">
                                <Route
                                    exact={true}
                                    path="/"
                                    component={() => (
                                        <Chores
                                            chores={this.state.commune.chores}
                                            user={this.state.commune.user}
                                        />
                                                     )}
                                />
                                <Route
                                    path="/budget"
                                    component={() => (<Budget purchases={this.state.commune.purchases} />)}
                                />
                                <Route
                                    path="/new_chore"
                                    component={() => (<NewChore refresh={this.notifyAndReset.bind(this)} />)}
                                />
                                <Route
                                    path="/new_purchase"
                                    component={() => (<NewPurchase refresh={this.notifyAndReset.bind(this)} />)}
                                />
                                <Route
                                    path="/new_user"
                                    component={() => (<NewCommuneUser refresh={this.notifyAndReset.bind(this)} />)}
                                />
                        </div>
                            < Snackbar
                                open={this.state.snackBarOpen}
                                message={this.state.notification}
                                autoHideDuration={5000}
                            />
                    </div>
                  </BrowserRouter>
                );
            } else {
                return <div><NewCommune user={this.state.commune.user}/></div>;
            }
        } else {
            return <div className="loading-screen"><div style={{padding: '200px' }}><CircularProgress /></div></div>;
        }

    }
}
