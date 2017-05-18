import * as React from 'react';
import {TableRowColumn, TableRow, RaisedButton} from 'material-ui';
import * as moment from 'moment';

export class PurchaseTableRow extends React.Component < any,
any > {

    render() {
        return (
            <TableRow>
                <TableRowColumn>{moment(this.props.purchase.created_at).fromNow()}</TableRowColumn>
                <TableRowColumn>{this.props.purchase.username}</TableRowColumn>
                <TableRowColumn>{this.props.purchase.description}</TableRowColumn>
                <TableRowColumn>{this.props.purchase.amount}</TableRowColumn>
                <TableRowColumn>
                    {this.props.user.user_id === this.props.purchase.user_id && !this.props.purchase.cancelled /*|| this.state.user.admin*/
                        ? <RaisedButton
                                primary={true}
                                onClick={this.props.delete(this.props.purchase)}
                                label="Delete"/>
                        : <span/>}
                </TableRowColumn>;
            </TableRow>
        );
    }

}