import RaisedButton from 'material-ui/RaisedButton';
import ApiService from '../../../services/api_service';
import {Notification} from '../notification';
import * as React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRowColumn,
  TableRow
} from 'material-ui/Table';

export class PurchaseList extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            user: this.props.user,
            purchases: null,
            errorMessage: null,
            success: false
        };
        this.deletePurchase.bind(this);
    }

    componentDidMount = () => {
        ApiService.getPurchases(this.setPurchases);
    }

    setPurchases = (err: any, result: any) => {
        if (!err) {
                // Newest first
                result.sort((a: any, b : any) => {
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                });
                this.setState({
                    purchases: result
                });

         } else {
                this.setState({
                    errorMessage: err
                });
        }
    }

    deletePurchase = (purchase: any) => {
        ApiService.deletePurchase(purchase, (err: any, result: any) => {
            if (!err) {
                var newPurchases = this.state.purchases;
                newPurchases = this.removePurchaseFromArray(purchase, newPurchases);
                this.setState({
                    purchases: newPurchases,
                    success: true
                });
                
            } else {
                this.setState({
                    errorMessage: err
                });
            }
        });
    }

    removePurchaseFromArray = (purchase: any, array: any) => {
        var index;
        index = array.indexOf(purchase);
        if ( index !== -1) {
            array.splice(index, 1);
        }
        return array;
    }

    render() {
        if (this.state.purchases) {
            var purchaseNodes = this.state.purchases.map( (purchase: any, index: any) => (
                <TableRow key={index}>
                    <TableRowColumn>{new Date(purchase.created_at).toLocaleString()}</TableRowColumn>
                    <TableRowColumn>{purchase.description}</TableRowColumn>
                    <TableRowColumn>{purchase.amount}</TableRowColumn>
                    <TableRowColumn >
                        {this.state.user.user_id === purchase.user_id /*|| this.state.user.admin*/ ?
                             <RaisedButton
                                primary={true}
                                onClick={this.deletePurchase.bind(this, purchase)}
                                label="Delete"
                             /> :
                              <span />}
                    </TableRowColumn>
                </TableRow>
            ), this);
            return (
                    <div className="dashboard-large-item">
                        <h2 className="dashboard-item-title">Purchases</h2>
                        <Table>
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>Date</TableHeaderColumn>
                                <TableHeaderColumn>Description</TableHeaderColumn>
                                <TableHeaderColumn>Amount</TableHeaderColumn>
                                <TableHeaderColumn>Delete</TableHeaderColumn>
                            </TableRow>
                            </TableHeader>
                            <TableBody>
                            {purchaseNodes}
                            </TableBody>
                        </Table>
                        <div>{this.state.errorMessage}</div>
                        {this.state.success ? <Notification message="Purchase deleted." /> : <span />}
                    </div>
            );
        } else {
            return (
                <div>Loading...</div>
            );
        }
    }

}