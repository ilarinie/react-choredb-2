import * as React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';
import {PurchaseList} from "./purchase_list";
import {TableRowColumn} from "material-ui";

export class Budget extends React.Component <any,
    any> {

    constructor(props: any) {
        super(props);
        this.state = {
            purchases: this.props.purchases,
            budgetList: null
        };
    }

    // Way too much logic up in here :(
    parsePurchasesToBudgetList = () => {
        if (this.state.purchases) {
            var users = [];
            var sum = 0;

            this
                .state
                .purchases
                .forEach((purchase) => {
                    let newPurchase = purchase;
                    let index = this.listIndexOfUser(purchase, users);
                    if (index !== -1) {
                        users[index].amount += parseFloat(purchase.amount);
                    } else {
                        newPurchase.amount = parseFloat(purchase.amount);
                        users.push(newPurchase);
                    }
                    sum += parseFloat(purchase.amount);
                });

            var average = sum / users.length;
            var budgetItems = [];
            users.forEach((user) => {
                var budgetItem: any = {};
                budgetItem.amount = user.amount;
                budgetItem.username = user.username;
                budgetItem.differential = user.amount - average;
                budgetItems.push(budgetItem);
            });

            budgetItems.sort((a, b) => {
                return b.differential - a.differential;
            });

            return budgetItems;
        }
    }

    listIndexOfUser = (user: any, list: any): number => {
        for (let i = 0; i < list.length; i++) {
            if (user.user_id === list[i].user_id) {
                return i;
            }
        }
        return -1;
    }

    render() {
        if (this.state.purchases) {
            var budgetNodes = this
                .parsePurchasesToBudgetList()
                .map((budgetItem: any, index: any) => (<BudgetRow key={index} budgetItem={budgetItem}/>), this);
        }

        return (
            <div>
                <div className="dashboard-large-item">
                    <h2 className="dashboard-item-title">Budget</h2>
                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>User</TableHeaderColumn>
                                <TableHeaderColumn>Spent</TableHeaderColumn>
                                <TableHeaderColumn>Differential</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {this.state.purchases
                                ? budgetNodes
                                : <div>Loading..</div>}
                        </TableBody>
                    </Table>
                </div>
                <PurchaseList user={this.props.user} purchases={this.state.purchases}/>
            </div>
        );
    }
}

const BudgetRow = ({...props}) => {
    return (
        <TableRow>
            <TableRowColumn>{props.budgetItem.username}</TableRowColumn>
            <TableRowColumn>{props.budgetItem.amount}</TableRowColumn>
            <TableRowColumn
                style={props.budgetItem.differential < 0
                    ? {
                        color: '#D32F2F'
                    }
                    : {
                        color: 'green'
                    }}
            >
                <b>{props.budgetItem.differential < 0 ? '' : '+'}{props.budgetItem.differential}</b>
            </TableRowColumn>
        </TableRow>
    );
}
