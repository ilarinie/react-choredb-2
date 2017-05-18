import RaisedButton from 'material-ui/RaisedButton';
import ApiService from '../../../services/api_service';
import {updateMessage} from '../notificator/notificator';
import * as React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRowColumn,
    TableRow
} from 'material-ui/Table';
import {fetchPurchases} from '../../../store/state_observable';
import {PurchaseTableRow} from './purchase_table_row';

export class PurchaseList extends React.Component < any,
any > {

    constructor(props : any) {
        super(props);
        this.state = {
            user: this.props.user,
            purchases: this.props.purchases,
            errorMessage: null,
            success: false,
            notification: null
        };
        this
            .deletePurchase
            .bind(this);
    }

    deletePurchase = (purchase : any) => {
        ApiService.deletePurchase(purchase, (err : any, result : any) => {
            if (!err) {
                updateMessage('Canceling purchase has been created');
                fetchPurchases();
            } else {
                this.setState({state: err});
            }
        });
    }

    removePurchaseFromArray = (purchase : any, array : any) => {
        var index;
        index = array.indexOf(purchase);
        if (index !== -1) {
            array.splice(index, 1);
        }
        return array;
    }

    render() {
        if (this.state.purchases) {
            // tslint:disable-next-line
            var purchaseNodes = this.state.purchases.map((purchase : any, index : any) => (<PurchaseTableRow user={this.state.user} purchase={purchase} delete={this.deletePurchase} key={index}/>), this);
            return (
                <div className="dashboard-large-item">
                    <h2 className="dashboard-item-title">Purchases</h2>
                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>Date</TableHeaderColumn>
                                <TableHeaderColumn>Username</TableHeaderColumn>
                                <TableHeaderColumn>Description</TableHeaderColumn>
                                <TableHeaderColumn>Amount</TableHeaderColumn>
                                <TableHeaderColumn>Delete</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {purchaseNodes}
                        </TableBody>
                    </Table>
                </div>
            );
        } else {
            return (
                <div>Loading...</div>
            );
        }
    }

}