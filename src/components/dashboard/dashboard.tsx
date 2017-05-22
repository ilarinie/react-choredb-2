import * as React from 'react';
import {NewCommune} from './communes/newCommune';
import {Notification} from './notificator/notification';
import { fetchAll} from '../../store/state_observable';
import CircularProgress from 'material-ui/CircularProgress';
import {routes} from './routes';


export class Dashboard extends React.Component <any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            mainState: this.props.mainState
        };
    }

    componentDidMount = () => {
        fetchAll();
    }

    componentWillUnmount = () => {
           /* this.choreSub.dispose();
            this.communeSub.dispose();
            this.purchaseSub.dispose();
            this.userSub.dispose();
            this.usersSub.dispose();*/
    }

    render() {

        var routePaths = routes(this);

        if (this.state.mainState.current_user) {
            if (this.state.mainState.current_user.commune_id) {
                if (this.state.mainState.commune && this.state.mainState.chores && this.state.mainState.purchases && this.state.mainState.commune_users) {
                    return (
                        <div>
                            {routePaths}
                            <Notification autoHideDuration={5000}/>
                        </div>

                    );
                } else {
                    return (
                        <div className="loading-screen">
                            <div style={{padding: '200px'}}><CircularProgress/></div>
                        </div>
                    );
                }

            // If there is a user, but no commune, show the commune creation screen.
            } else {
                return (
                    <NewCommune user={this.state.mainState.current_user} />
                );
            }
        // If there is no user, that means we're still waiting for a response from the api
        } else {
            return (
                <div className="loading-screen">
                    <div style={{padding: '200px'}}><CircularProgress/></div>
                </div>
            );
        }
    }
}
