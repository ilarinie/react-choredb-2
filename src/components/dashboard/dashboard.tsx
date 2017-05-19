import * as React from 'react';
import {NewCommune} from './communes/newCommune';
import {Notification} from './notificator/notification';
import {fetchCommune, communeStream, choreStream, purchaseStream, userStream} from '../../store/state_observable';
import CircularProgress from 'material-ui/CircularProgress';
import {routes} from './routes';

export class Dashboard extends React.Component <any, any> {

    choreSub: any;
    purchaseSub: any;
    communeSub: any;
    userSub: any;

    constructor(props: any) {
        super(props);
        this.state = {
            notification: '',
            commune: null,
            user: null,
            chores: null,
            purchases: null
        };
    }

    componentDidMount = () => {
        this.setState({notification: ''});
        this.choreSub = choreStream.subscribe((chores) => {
            this.setState({chores: chores});
        });
        this.purchaseSub = purchaseStream.subscribe((purchases) => {
            this.setState({purchases: purchases});
        });
        this.communeSub = communeStream.subscribe((commune) => {
            this.setState({commune: commune});
        });
        this.userSub = userStream.subscribe((user) => {
            this.setState({user: user});
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
            this
                .communeSub
                .dispose();
        }
    }

    render() {

        var routePaths = routes(this);

        if (this.state.user) {
            if (this.state.commune) {
                return (
                    <div>
                        {routePaths}
                        <Notification autoHideDuration={5000}/>
                    </div>

                );
            // If there is a user, but no commune, show the commune creation screen.
            } else {
                return (
                    <NewCommune user={this.state.user} />
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
