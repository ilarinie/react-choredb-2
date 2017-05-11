import React, {
    Component
} from 'react';
import {Toolbar} from './toolbar';
import { Chores } from './chores';
import { Budget } from './budget';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { logout } from '../../auth/auth_service';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "chores",
    };
  }

  handleMenuItem = (ev) => {
        this.setState({selectedTab: this.parseSelectedTab(ev.target.innerHTML)});
  }

  parseSelectedTab = (data) => {
    if (data.indexOf('Budget') != -1 ){
      return "budget";
    } else if ( data.indexOf('Chores') != -1){
      return "chores";
    } else if ( data.indexOf('Log Out') != -1) {
      logout();
      return "logout";
    } else {
      return "chores";
    }
  }

  render() {
    switch(this.state.selectedTab) {
      case "chores":
        return <div><Toolbar onClick={() => this.handleMenuItem} /><Chores /></div>;
      case "budget":
        return <div><Toolbar onClick={() => this.handleMenuItem} /><Budget /></div>;
      default:
        return <div><Toolbar onClick={() => this.handleMenuItem}  /></div>
    }
  }
}

module.exports = {
  Dashboard
}
