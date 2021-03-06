import * as React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ApiService from '../../../services/api_service';
import {Redirect} from 'react-router-dom';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import {updateMessage} from '../notificator/notificator';
import {fetchCurrentUser, fetchPurchases} from '../../../store/state_observable';

export class NewPurchase extends React.Component<any, any> {

constructor(props : any) {
  super(props);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.state = {
    descriptionError: null,
    amountError: null,
    purchaseSuccess: null,
    purchaseError: null
  };

}

handleSubmit = (event: any) =>  {
  event.preventDefault();
  var desc = this.parseDescription((document.getElementById('purchase-description-input') as HTMLInputElement).value);
  if (!desc) {
    return;
  }
  var amount = this.parseAmount((document.getElementById('purchase-amount-input') as HTMLInputElement).value);
  if (!amount) {
    return;
  }
  var purchase: any = {};
  purchase.description = desc;
  purchase.amount = amount;
  ApiService.postPurchase(purchase).then((response) => {
    updateMessage('New purchase created');
    fetchPurchases();
    fetchCurrentUser();
  }).catch((error) => {
    updateMessage(error.message);
  });
}

callBack = (err: any, response: any) => {
  if (!err) {
    this.setState({purchaseSuccess: response.message, purchaseError: null});

  } else {
    this.setState({purchaseSuccess: null, errorObject: err});
  }
}

parseDescription = (desc: any) => {
  if (!desc) {
    this.setState({descriptionError: 'Description is required'});
    return null;
  }
  if (desc.length < 1) {
    this.setState({descriptionError: 'Description is too short'});
    return null;
  }
  if (desc.length > 100) {
    this.setState({descriptionError: 'Description is too long'});
    return null;
  }
  return desc;
}
parseAmount = (amount: any) => {
  if (!amount) {
    this.setState({amountError: 'Description is required'});
    return null;
  }
  var toNumber = parseFloat(amount);
  if (isNaN(toNumber)) {
    this.setState({amountError: 'Amount has to be a number'});
    return null;
  }
  if (amount < 0) {
    this.setState({amountError: 'Amount needs to be positive'});
    return null;
  }
  return toNumber;
}

render() {
  if (this.state.purchaseSuccess) {
    return <Redirect to="/budget" push={true} />;
  } else {
  return (
    <div className="form-component-container">
      <form onSubmit={this.handleSubmit}>
      <h1>Create a new purchase</h1>
      <Paper zDepth={2}>
      <TextField
        id="purchase-description-input"
        className="small-form-input"
        hintText="Description"
        underlineShow={false}
        errorText={this.state.descriptionError ? this.state.descriptionError : ''}  
      />
      <Divider />
      <TextField
        id="purchase-amount-input"
        className="small-form-input"
        hintText="Amount"
        type="tel"
        underlineShow={false}
        errorText={this.state.amountError ? this.state.amountError : ''}
      />
      <Divider />
      </Paper><br />
      <RaisedButton type="submit" label="Create" />
      <div className="purchase-success-div">{this.state.purchaseSuccess}</div>

      </form>

    </div>
  );
}
}

}

export default NewPurchase;
