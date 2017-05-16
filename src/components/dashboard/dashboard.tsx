import * as React from 'react';
import {Chores} from './chores';
import {Budget} from './budget';
import {NewCommune} from './newCommune';
import {NewChore} from './new_chore';
import {NewPurchase} from './new_purchase';
import { NewCommuneUser } from './new_commune_user';
import ApiService from '../../services/api_service';
import { BrowserRouter,  Route } from 'react-router-dom';
import { MenuComponent } from './menu_component';
import Snackbar from 'material-ui/Snackbar';
import { PurchaseList } from './purchases/purchase_list'; 
import { Profile } from './profile/profile';

import CircularProgress from 'material-ui/CircularProgress';

export class Dashboard extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            notification: '',
            commune: null,
            drawerOpen: false,
            snackBarOpen: false
        };
    }

    notifyAndReset = (message: any) => {
        this.setState({ snackBarOpen: true, notification: message});
        ApiService.getCommune(this.setCommune);
    }

    componentDidMount = () => {
        this.setState({
            notification: ''
        });
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
                return (
                  <BrowserRouter>
                    <div>
                        <MenuComponent commune={this.state.commune} />
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
                                <Route
                                    path="/purchases"
                                    component={() => ( <PurchaseList user={this.state.commune.user} /> )}
                                />
                                <Route
                                    path="/profile"
                                    component={() => ( <Profile user={this.state.commune.user} /> )}
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
