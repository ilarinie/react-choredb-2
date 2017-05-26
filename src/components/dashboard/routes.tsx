import {BrowserRouter, Route} from "react-router-dom";
import {MenuComponent} from "./menu/menu_component";
import {Chores} from "./chores/chores";
import {Budget} from "./purchases/budget";
import {NewPurchase} from "./purchases/new_purchase";
import {ChoreDetails} from "./chores/chore_details/chore_details";
import {CSSTransitionGroup} from 'react-transition-group';
import {Profile} from "./profile/profile";
import * as React from 'react';
import {NotFound} from "./not_found";
import {Switch} from "react-router";
import {PurchaseList} from "./purchases/purchase_list";
import {AdminPanel} from "./admin_panel/admin_panel";

export var routes = (context: any) => {
    return (
        <BrowserRouter>
            <div>
                <div className="dashboard-container">
                    <MenuComponent commune={context.state.mainState.commune} user={context.state.mainState.current_user}/>
                    <CSSTransitionGroup
                        transitionName="example"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}
                        transitionAppear={true}
                        transitionAppearTimeout={10000}
                    >
                        <Switch>
                            <Route exact={true} path="/" component={() => (<Chores mainState={context.props.mainState} />)}/>
                            <Route path="/budget" component={() => (<Budget user={context.props.mainState.current_user} users={context.props.mainState.commune_users} purchases={context.props.mainState.purchases}/>)}/>
                            <Route path="/purchase_list" component={() => (<PurchaseList purchases={context.props.mainState.purchases} user={context.props.mainState.current_user}/>)}/>
                            <Route path="/new_purchase" component={() => (<NewPurchase/>)}/>
                            <Route path="/chores/:index" component={() => (<ChoreDetails chores={context.props.mainState.chores}/>)}/>
                            <Route path="/profile" component={() => (<Profile mainState={context.props.mainState} />)}/>
                            <Route path="/admin_panel" component={() => (<AdminPanel mainState={context.props.mainState} />)} />
                            <Route path="*" component={() => (<NotFound/>)} />
                        </Switch>
                    </CSSTransitionGroup>
                </div>
            </div>
        </BrowserRouter>
    );
}


/* UNUSED ROUTES HERE

 <Route path="/purchases"
 component={() => (<PurchaseList purchases={context.state.purchases} user={context.state.user}/>)}/>

 */