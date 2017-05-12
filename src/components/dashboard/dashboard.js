import React, {
    Component
} from 'react';
import {Toolbar} from './toolbar';
import { Chores } from './chores';
import { Budget } from './budget';
import { NewCommune } from './newCommune';
import { NewChore } from './new_chore';
import { logout, getCommune } from '../../services/api_service';

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

  setCommune = (err, response) => {
    if (!err) {
      var res = JSON.parse(response);
      this.setState({commune: res.commune, chores: res.chores, user: res.user})
    } else {
      console.log(err);
    }
  }

  componentDidMount(){
    getCommune(this.setCommune);
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
    } else if (data.indexOf('New Chore') !== -1){
      return "newchore";
    } else {
      return "chores";
    }
  }

  render() {


    if ( this.state.user ) {

      if ( this.state.commune ){
        var toolbar =<Toolbar disabled={false} communeName={this.state.commune.name} onClick={() => this.handleMenuItem} />;
        switch(this.state.selectedTab) {
          case "chores":
            return <div> {toolbar}<Chores chores={this.state.chores}/></div>;
          case "budget":
            return <div>{toolbar}<Budget /></div>;
          case "newchore":
            return <div>{toolbar}<NewChore /></div>
          default:
            return <div>{toolbar}</div>
        }
      } else {
        return <div><Toolbar onClick={() => null}/><NewCommune user={this.state.user} /></div>
      }
    } else {
      return <div><Toolbar onClick={() => null}/> Loading..</div>
    }

  }
}

module.exports = {
  Dashboard
}
