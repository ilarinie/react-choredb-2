import React, {
    Component
} from 'react';
import {Toolbar} from './toolbar';
import { Chores } from './chores';
import { Budget } from './budget';
import { NewCommune } from './newCommune';
import { logout } from '../../auth/auth_service';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "chores",
      commune: null,
      chores: null,
      user: null
    };
  }

  componentDidMount(){
    //fetch commune data;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/communes", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization","JWT " + localStorage.getItem("token"));
    xhr.onreadystatechange = (event) => {
      console.log(event.target.response)
      var response = JSON.parse(""+event.target.response.toString());
      this.setState({commune: response.commune, chores: response.chores, user: response.user});
    }
    xhr.send();
  }

  handleMenuItem = (ev) => {
        this.setState({selectedTab: this.parseSelectedTab(ev.target.innerHTML)});
  }

  parseSelectedTab = (data) => {
    if (data.indexOf('Budget') !== -1 ){
      return "budget";
    } else if ( data.indexOf('Chores') !== -1){
      return "chores";
    } else if ( data.indexOf('Log Out') !== -1) {
      logout();
      return "logout";
    } else {
      return "chores";
    }
  }

  render() {
    if ( this.state.user ) {

      if ( this.state.commune ){
        switch(this.state.selectedTab) {
          case "chores":
            return <div><Toolbar onClick={() => this.handleMenuItem} /><Chores chores={this.state.chores}/></div>;
          case "budget":
            return <div><Toolbar onClick={() => this.handleMenuItem} /><Budget /></div>;
          default:
            return <div><Toolbar onClick={() => this.handleMenuItem}  /></div>
        }
      } else {
        return <div><Toolbar disabled={true} onClick={() => null}/><NewCommune user={this.state.user} /></div>
      }
    } else {
      return <div><Toolbar disabled={true} onClick={() => null}/> Loading..</div>
    }

  }
}

module.exports = {
  Dashboard
}
