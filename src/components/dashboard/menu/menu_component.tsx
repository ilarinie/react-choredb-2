import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import Subheader from 'material-ui/Subheader';

export class MenuComponent extends React.Component<any, any> {

    iconStyles;

    constructor(props: any) {
        super(props);
        this.state = {
            commune: this.props.commune,
            user: this.props.user
        };
        this.iconStyles = {
            marginRight: 24
        };
    }

    handleToggle = () => {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        });
    }

    handleClose = () => {
        this.setState({ drawerOpen: false });
    }

    logOut = () => {
        localStorage.removeItem('token');
        location.reload();
    }

    render() {
        var adminMenuItems = (
            <div>
                <Divider />
                <Subheader>Admin tools</Subheader>
                <Subheader>Add</Subheader>
                <Link to="/new_chore">
                    <MenuItem 
                        onTouchTap={this.handleClose}
                        leftIcon={<FontIcon className="fa fa-plus" aria-hidden="true"/>}
                    >Chore
                    </MenuItem>
                </Link>
                <Link to="/new_user">
                    <MenuItem 
                        onTouchTap={this.handleClose}
                        leftIcon={<FontIcon className="fa fa-plus" aria-hidden="true"/>}
                    >User
                    </MenuItem>
                </Link>
                <Divider />
            </div>
        );

        var navigationBar = (
            <div>
                <AppBar
                    title={this.state.commune.name + ' || ' +  this.state.user.username}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={this.handleToggle}
                />
                <Drawer
                    open={this.state.drawerOpen}
                    docked={false}
                    width={200}
                    onRequestChange={(open) => this.setState({ open })}
                >
                    <MenuItem disabled={true} >ChoreDB 2.0</MenuItem>
                    <Divider />
                    <Link to="/profile">
                       <MenuItem 
                        onTouchTap={this.handleClose}
                        leftIcon={<FontIcon className="fa fa-user-circle-o" aria-hidden="true"/>}
                       >Profile
                       </MenuItem>
                    </Link>

                    <Link to="/">
                        <MenuItem
                            onTouchTap={this.handleClose}
                            leftIcon={<FontIcon className="fa fa-check-circle-o" aria-hidden="true"/>}
                        >Chores
                        </MenuItem>
                    </Link>
                    <Link to="/budget">
                        <MenuItem 
                            onTouchTap={this.handleClose}
                            leftIcon={<FontIcon className="fa fa-line-chart" aria-hidden="true"/>}
                        >Budget
                        </MenuItem>
                    </Link>
                    <Link to="/new_purchase">
                        <MenuItem 
                            onTouchTap={this.handleClose}
                            leftIcon={<FontIcon className="fa fa-money" aria-hidden="true"/>}
                        >New Purchase
                        </MenuItem>
                    </Link>
                    {true ? adminMenuItems : ''}
                    <Subheader > Logged in as : </Subheader>
                    <Subheader > {this.state.user.username} </Subheader>
                    <MenuItem
                        onTouchTap={this.logOut}
                        leftIcon={<FontIcon className="fa fa-power-off" aria-hidden="true"/>}
                    >Log Out
                    </MenuItem>
                </Drawer>
            </div>
        );
        return (
            <div>
            {navigationBar}
            </div>
        );
    }

}

/* UNUSED MENU ITEMS

 <Link to="/purchases">
 <MenuItem
 onTouchTap={this.handleClose}
 leftIcon={<FontIcon className="fa fa-money" aria-hidden="true"/>}
 >Purchases
 </MenuItem>
 </Link>
 */