import * as React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';
import {PurchaseList} from "./purchase_list";
import {TableRowColumn} from "material-ui";

const BudgetRow = ({...props}) => {
    return (
        <TableRow>
            <TableRowColumn>{props.budgetItem.username}</TableRowColumn>
            <TableRowColumn>{props.budgetItem.amount}</TableRowColumn>
            <TableRowColumn style={props.budgetItem.differential < 0 ? {color: '#D32F2F'} : {color: 'green'}}>
                <b>{props.budgetItem.differential < 0 ? '' : '+'}{props.budgetItem.differential}</b>
            </TableRowColumn>
        </TableRow>
    );
}


export class Budget extends React.Component <any,
    any> {

    constructor(props: any) {
        super(props);
        this.state = {
            purchases: this.props.purchases,
            budgetList: null,
            otherPurchasesAmount: null
        };
    }

    // Way too much logic up in here :(
    parsePurchasesToBudgetList = () => {
        if (this.state.purchases) {
            var users = [];
            var sum = 0;
            var otherPurchases = {amount: 0};


            this.state.purchases.forEach((purchase) => {
                if (this.belongsToCommune(purchase.user_id)) {
                    let newPurchase = purchase;
                    let index = this.listIndexOfUser(purchase, users);
                    if (index !== -1) {
                        users[index].amount += parseFloat(purchase.amount);
                    } else {
                        newPurchase.amount = parseFloat(purchase.amount);
                        users.push(newPurchase);
                    }
                    sum += parseFloat(purchase.amount);
                } else {
                    otherPurchases.amount += purchase.amount;
                }
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

    belongsToCommune(userId: string) {
        for (let i = 0; i < this.props.users.length; i++) {
            if (this.props.users[i].user_id === userId ) {
                return true;
            }
        }
        return false;
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
            </div>
        );
    }
}


