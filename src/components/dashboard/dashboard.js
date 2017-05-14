import React, {Component} from 'react';
import {Toolbar} from './toolbar';
import {Chores} from './chores';
import {Budget} from './budget';
import {NewCommune} from './newCommune';
import {NewChore} from './new_chore';
import {NewPurchase} from './new_purchase';
import RaisedButton from 'material-ui/RaisedButton';
import {logout, getCommune} from '../../services/api_service';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "chores",
            commune: null,
            chores: null,
            purchases: null,
            user: null,
            newChore: false,
            newPurchase: false,
        };
        this.openNewChore = this.openNewChore.bind(this);
    }

    setCommune = (err, response) => {
        if (!err) {
            var res = JSON.parse(response);
            this.setState({commune: res.commune, chores: res.chores, user: res.user, purchases: res.purchases});
        } else {
            console.log(err);
        }
    }

    componentDidMount() {
        getCommune(this.setCommune);
    }

    handleMenuItem = (ev) => {
        this.setState({
            selectedTab: this.parseSelectedTab(ev.target.innerHTML)
        });
    }

    parseSelectedTab = (data) => {
        if (data.indexOf('Budget') !== -1) {
            return "budget";
        } else if (data.indexOf('Chores') !== -1) {
            return "chores";
        } else if (data.indexOf('Log Out') !== -1) {
            logout();
            return "logout";
        } else if (data.indexOf('New Chore') !== -1) {
            return "newchore";
        } else if (data.indexOf('New Purchase') !== -1) {
            return "newpurchase";
        } else {
            return "chores";
        }
    }

    openNewChore = (event) => {
      event.preventDefault();
      this.setState({newChore: true});
    }
    closeNewChore = (event) => {
      this.setState({newChore: false});
    }

    openNewPurchase = (event) => {
      event.preventDefault();
      this.setState({newPurchase: true});
    }

    closeNewPurchase = (event) => {
      this.setState({newPurchase: false});
    }

    render() {

        if (this.state.user) {

            if (this.state.commune) {
                var toolbar = <Toolbar disabled={false} communeName={this.state.commune.name} onClick={() => this.handleMenuItem}/>;
                /*
        switch(this.state.selectedTab) {
          case "chores":
            return <div> {toolbar}<Chores chores={this.state.chores}/></div>;
          case "budget":
            return <div>{toolbar}<Budget purchases={this.state.purchases}/></div>;
          case "newchore":
            return <div>{toolbar}<NewChore /></div>;
          case "newpurchase":
            return <div>{toolbar}<NewPurchase /></div>
          default:
            return <div>{toolbar}</div>
        }
        */
                return (
                    <div>
                        {toolbar}
                        <div className="dashboard-container">
                            <div className="dashboard-item">
                                <Chores chores={this.state.chores}/>
                                <div className="create-input-container">
                                  {this.state.user.admin && !this.state.newChore ? <RaisedButton label="New Chore" onClick={this.openNewChore} /> : null}
                                  {this.state.newChore ? <div><RaisedButton label="X" onClick={this.closeNewChore} /> <NewPurchase /></div> : null}
                                </div>

                            </div>
                            <div className="dashboard-item">
                                <Budget purchases={this.state.purchases} />
                                {this.state.newPurchase ? <div><RaisedButton label="X" onClick={this.closeNewPurchase} /> <NewPurchase /></div> : <RaisedButton label="New Purchase" onClick={this.openNewPurchase} /> }
                            </div>
                        </div>
                    </div>
                )
            } else {
                return <div><Toolbar onClick={() => null}/><NewCommune user={this.state.user}/></div>
            }
        } else {
            return <div><Toolbar onClick={() => null}/>
                Loading..</div>
        }

    }
}

module.exports = {
    Dashboard
}
