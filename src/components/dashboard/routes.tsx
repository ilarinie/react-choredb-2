import {BrowserRouter, Route} from "react-router-dom";
import {MenuComponent} from "./menu/menu_component";
import {Chores} from "./chores/chores";
import {Budget} from "./purchases/budget";
import {NewPurchase} from "./purchases/new_purchase";
import {ChoreForm} from "./chores/chore_form";
import {NewCommuneUser} from "./communes/new_commune_user";
import {ChoreDetails} from "./chores/chore_details/chore_details";
import {CSSTransitionGroup} from 'react-transition-group';
import {Profile} from "./profile/profile";
import * as React from 'react';
import {NotFound} from "./not_found";
import {Switch} from "react-router";

export var routes = (context: any) => {
    return (
        <BrowserRouter>
            <div>
                <div className="dashboard-container">
                    <MenuComponent commune={context.state.commune} user={context.state.user}/>
                    <CSSTransitionGroup
                        transitionName="example"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}
                        transitionAppear={true}
                        transitionAppearTimeout={10000}
                        
                    >
                        <Switch>
                            <Route exact={true} path="/" component={() => (<Chores chores={context.state.chores} user={context.state.user}/>)}/>
                            <Route path="/budget" component={() => (<Budget user={context.state.user} purchases={context.state.purchases}/>)}/>
                            <Route path="/new_chore" component={() => (<ChoreForm chore={{}}/>)}/>
                            <Route path="/new_purchase" component={() => (<NewPurchase/>)}/>
                            <Route path="/new_user" component={() => (<NewCommuneUser/>)}/>
                            <Route path="/chores/:index"
                                   component={() => (<ChoreDetails chores={context.state.chores}/>)}/>
                            <Route path="/profile" component={() => (<Profile user={context.state.user}/>)}/>
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