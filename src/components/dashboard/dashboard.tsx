import * as React from 'react';
import {Chores} from './chores/chores';
import {Budget} from './purchases/budget';
import {NewCommune} from './newCommune';
import {NewChore} from './chores/new_chore';
import {NewPurchase} from './purchases/new_purchase';
import {NewCommuneUser} from './new_commune_user';
import {Notification} from './notificator/notification';
import ApiService from '../../services/api_service';
import {BrowserRouter, Route} from 'react-router-dom';
import {MenuComponent} from './menu_component';
import Snackbar from 'material-ui/Snackbar';
import {PurchaseList} from './purchases/purchase_list';
import {Profile} from './profile/profile';
import {fetchCommune, communeStream, choreStream, purchaseStream, userStream} from '../../store/state_observable';

import CircularProgress from 'material-ui/CircularProgress';

export class Dashboard extends React.Component < any,
any > {

    choreSub : any;
    purchaseSub : any;
    communeSub : any;
    userSub: any;

    constructor(props : any) {
        super(props);
        this.state = {
            notification: '',
            commune: null,
            user: null,
            chores: null,
            purchases: null,
            drawerOpen: false,
            snackBarOpen: false
        };
    }

    componentDidMount = () => {
        this.setState({notification: ''});
        this.choreSub = choreStream.subscribe((chores) => {
            this.setState({chores: chores});
        });
        this.purchaseSub = purchaseStream.subscribe((purchases) => {
            this.setState({ purchases: purchases });
        });
        this.communeSub = communeStream.subscribe((commune) => {
            this.setState({commune: commune});
        });
        this.userSub = userStream.subscribe((user) => {
            this.setState({ user: user });
        });

        fetchCommune();
    }

    componentWillUnmount = () => {
        if (this.choreSub) {
            this
                .choreSub
                .dispose();
        }
        if (this.communeSub) {
            this.communeSub.dispose();
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

        if (this.state.commune && this.state.user) {
            if (this.state.commune) {
                return (
                    <div>
                        <BrowserRouter>
                            <div>
                                <MenuComponent commune={this.state.commune} user={this.state.user} />
                                <div className="dashboard-container">
                                    <Route
                                        exact={true}
                                        path="/"
                                        component={() => (<Chores chores={this.state.chores} user={this.state.user}/>)}/>
                                    <Route
                                        path="/budget"
                                        component={() => (<Budget purchases={this.state.purchases}/>)}/>
                                    <Route path="/new_chore" component={() => (<NewChore/>)}/>
                                    <Route path="/new_purchase" component={() => (<NewPurchase/>)}/>
                                    <Route path="/new_user" component={() => (<NewCommuneUser/>)}/>
                                    <Route
                                        path="/purchases"
                                        component={() => (<PurchaseList purchases={this.state.purchases} user={this.state.user}/>)}/>
                                    <Route
                                        path="/profile"
                                        component={() => (<Profile user={this.state.user}/>)}/>
                                </div>
                            </div>
                        </BrowserRouter>
                        <Notification autoHideDuration={5000}/>
                    </div>

                );
            } else {
                return <div><NewCommune user={this.state.commune.user}/></div>;
            }
        } else {
            return (
                <div className="loading-screen">
                    <div
                        style={{
                        padding: '200px'
                    }}><CircularProgress/>
                    </div>
                </div>
            );
        }

    }
}
