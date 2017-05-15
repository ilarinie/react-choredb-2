import * as React from 'react';
import {Chores} from './chores';
import {Budget} from './budget';
import {NewCommune} from './newCommune';
import {NewChore} from './new_chore';
import {NewPurchase} from './new_purchase';
import {NewCommuneUser} from './new_commune_user';
import {getCommune} from '../../services/api_service';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';

export class Dashboard extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            notification: null,
            commune: null,
            chores: null,
            purchases: null,
            user: null,
            open: false
        };
    }

    notifyAndReset = (message: any) => {
      this.setState({notification: message});
      getCommune(this.setCommune);
    }

    componentDidMount = () => {
        getCommune(this.setCommune);
    }

    setCommune = (err: any, response: any) => {
        if (!err) {
            var res = JSON.parse(response);
            this.setState({commune: res.commune, chores: res.chores, user: res.user, purchases: res.purchases});
        } else {
            localStorage.removeItem('token');
            location.reload();
        }
    }

    handleToggle = () => {
      this.setState({open: !this.state.open});
    }

    handleClose = () => {
      this.setState({open: false});
    }

    logOut = () => {
      localStorage.removeItem('token');
      location.reload();
    }

    render() {

        if (this.state.user) {
            if (this.state.commune) {
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
                            title={this.state.commune.name + ' || ' + this.state.user.username}
                            iconClassNameRight="muidocs-icon-navigation-expand-more"
                            onLeftIconButtonTouchTap={this.handleToggle}
                          />
                          <Drawer
                              open={this.state.open}
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
                            {this.state.user.admin ? adminMenuItems : ''}
                            <MenuItem onTouchTap={this.logOut}>Log Out</MenuItem>
                          </Drawer>
                      </div>
                      );

                return (
                  <BrowserRouter>
                    <div>
                        {navigationBar}
                        <div className="notification-bar">
                          {this.state.notification ? this.state.notification : ''}
                        </div>
                        <div className="dashboard-container">
                                <Route
                                    exact={true}
                                    path="/"
                                    component={() => (<Chores chores={this.state.chores} user={this.state.user} />)}
                                />
                                <Route
                                    path="/budget"
                                    component={() => (<Budget purchases={this.state.purchases} />)}
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

                    </div>
                  </BrowserRouter>
                );
            } else {
                return <div><NewCommune user={this.state.user}/></div>;
            }
        } else {
            return <div className="loading-screen"><div style={{padding: '200px' }}><CircularProgress /></div></div>;
        }

    }
}
