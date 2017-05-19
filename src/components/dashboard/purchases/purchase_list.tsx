import RaisedButton from 'material-ui/RaisedButton';
import ApiService from '../../../services/api_service';
import {updateMessage} from '../notificator/notificator';
import * as React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow
} from 'material-ui/Table';
import {fetchPurchases} from '../../../store/state_observable';
import * as moment from 'moment';
import {TableRowColumn} from "material-ui";

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
                updateMessage('Purchase has been cancelled succesfully');
                fetchPurchases();
            } else {
                this.setState({state: err});
            }
        });
    }

    render() {
        if (this.state.purchases) {
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

const PurchaseTableRow = ({...props}) => {
    return (
        <TableRow>
            <TableRowColumn>{moment(props.purchase.created_at).fromNow()}</TableRowColumn>
            <TableRowColumn>{props.purchase.username}</TableRowColumn>
            <TableRowColumn>{props.purchase.description}</TableRowColumn>
            <TableRowColumn>{props.purchase.amount}</TableRowColumn>
            <TableRowColumn>
                {props.user.user_id === props.purchase.user_id && !props.purchase.cancelled /*|| props.state.user.admin*/
                    ? <RaisedButton
                        primary={true}
                        onClick={props.delete.bind(null, props.purchase)}
                        label="Delete"/>
                    : <span/>}
            </TableRowColumn>;
        </TableRow>
    );
};