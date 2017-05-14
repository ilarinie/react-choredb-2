import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {postPurchase} from '../../services/api_service';
import {Redirect} from 'react-router-dom';

export class NewPurchase extends Component {

constructor(props) {
  super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  this.state = {
    descriptionError: null,
    amountError: null,
    purchaseSuccess: null,
    purchaseError: null
  }

}

handleSubmit = (event) =>  {
  event.preventDefault();
  var desc = this.parseDescription(document.getElementById('purchase-description-input').value);
  if (!desc){
    return;
  }
  var amount = this.parseAmount(document.getElementById('purchase-amount-input').value);
  if (!amount) {
    return;
  }
  var purchase = {};
  purchase.description = desc;
  purchase.amount = amount;
  postPurchase(purchase, this.callBack);
}

callBack = (err, response) => {
  if (!err) {
    var parsedRes = JSON.parse(response);
    this.setState({purchaseSuccess: parsedRes.message, purchaseError: null})
    this.props.refresh(parsedRes.message);
  } else {
    var parsedErr = JSON.parse(err);
    this.setState({purchaseSuccess: null, purchaseError: parsedErr.message})
  }
}

parseDescription = (desc) => {
  if (!desc){
    this.setState({descriptionError: "Description is required"});
    return null;
  }
  if (desc.length < 1) {
    this.setState({descriptionError: "Description is too short"});
    return null;
  }
  if (desc.length > 100) {
    this.setState({descriptionError: "Description is too long"});
    return null;
  }
  return desc;
}
parseAmount = (amount) => {
  if (!amount){
    this.setState({amountError: "Description is required"});
    return null;
  }
  var number = parseFloat(amount);
  if (isNaN(number)){
    this.setState({amountError: "Amount has to be a number"});
    return null;
  }
  if (amount < 0) {
    this.setState({amountError: "Amount needs to be positive"});
    return null;
  }
  return amount;
}




render() {
  if (this.state.purchaseSuccess) {
    return <Redirect to="/budget" push />
  } else {
  return (
    <div className="form-component-container">
      <form onSubmit={this.handleSubmit}>
      <TextField
        id="purchase-description-input"
        hintText="description"
        errorText={this.state.descriptionError ? this.state.descriptionError : ""}
         /><br/>
      <TextField
        id="purchase-amount-input"
        hintText="Amount"
        type="number"
        errorText={this.state.amountError ? this.state.amountError : "" } /><br/>
      <RaisedButton type="submit" label="Create" />
      <div className="purchase-success-div">{this.state.purchaseSuccess}</div>
      <div className="purchase-error-div">{this.state.purchaseError}</div>

      </form>

    </div>
  )
}
}

}

export default NewPurchase;
