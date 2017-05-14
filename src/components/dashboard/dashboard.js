import React, {Component} from 'react';
import {Toolbar} from './toolbar';
import {Chores} from './chores';
import {Budget} from './budget';
import {NewCommune} from './newCommune';
import {NewChore} from './new_chore';
import {NewPurchase} from './new_purchase';
import RaisedButton from 'material-ui/RaisedButton';
import {logout, getCommune} from '../../services/api_service';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notification: null,
            selectedTab: "chores",
            commune: null,
            chores: null,
            purchases: null,
            user: null,
            open: false
        };
    }

    notifyAndReset = (message) => {
      this.setState({notification: message});
      getCommune(this.setCommune)
    }

    componentDidMount = () => {
        getCommune(this.setCommune);
    }

    setCommune = (err, response) => {
        if (!err) {
            var res = JSON.parse(response);
            this.setState({commune: res.commune, chores: res.chores, user: res.user, purchases: res.purchases});
        } else {
            localStorage.removeItem("token");
            location.reload();
        }
    }

    handleToggle = () => {
      console.log("as");
      this.setState({open: !this.state.open})
    }

    handleClose = () => {
      this.setState({open: false});
    }

    logOut = () => {
      localStorage.removeItem("token");
      location.reload();
    }

    render() {

        if (this.state.user) {
            if (this.state.commune) {
                var navigationBar =  (
                      <div>
                          <AppBar
                            title={this.state.commune.name + " || " + this.state.user.username}
                            iconClassNameRight="muidocs-icon-navigation-expand-more"
                            onLeftIconButtonTouchTap={this.handleToggle}
                          />
                          <Drawer open={this.state.open}
                                  docked={false}
                                  width={200}
                                  onRequestChange={(open) => this.setState({open})}
                          >
                            <Link to="/"><MenuItem onTouchTap={this.handleClose}>Chores</MenuItem></Link>
                            <Link to="/budget"><MenuItem onTouchTap={this.handleClose}>Budget</MenuItem></Link>
                            <Link to="/new_chore"><MenuItem onTouchTap={this.handleClose}>New Chore</MenuItem></Link>
                            <Link to="/new_purchase"><MenuItem onTouchTap={this.handleClose}>New Purchase</MenuItem></Link>
                            <MenuItem onTouchTap={this.logOut}>Log Out</MenuItem>
                          </Drawer>
                      </div>
                      );

                return (
                  <BrowserRouter>
                    <div>
                        {navigationBar}
                        <div className="notification-bar">
                          {this.state.notification ? this.state.notification : ""}
                        </div>
                        <div className="dashboard-container">
                          <CSSTransitionGroup
                            transitionName="fade"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={300}>
                            <Route exact path="/" component={() => (<Chores chores={this.state.chores} user={this.state.user}/>)}/>
                            <Route path="/budget" component={() => (<Budget purchases={this.state.purchases} /> )}/>
                            <Route path="/new_chore" component={() => (<NewChore refresh={this.notifyAndReset.bind(this)} />)} />
                            <Route path="/new_purchase" component={() => (<NewPurchase refresh={this.notifyAndReset.bind(this)} />)} />
                          </CSSTransitionGroup>
                        </div>

                    </div>
                  </BrowserRouter>
                )
            } else {
                return <div><Toolbar onClick={() => null}/><NewCommune user={this.state.user}/></div>
            }
        } else {
            return <div className="loading-screen"><CircularProgress /></div>
        }

    }
}

module.exports = {
    Dashboard
}
