import * as React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {postChore} from '../../services/api_service';
import {Redirect} from 'react-router-dom';

export class NewChore extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      errors: null,
      backendErrors: '', 
      backendSuccess: ''
    };
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    let name;
    name = this.parseName((document.getElementById('chore-form-name') as HTMLInputElement).value);

    if (!name) {
      return;
    }
    let priority = this.parsePriority((document.getElementById('chore-form-priority') as HTMLInputElement).value);
    if (!priority) {
      return;
    }
    var points = this.parsePoints((document.getElementById('chore-form-points') as HTMLInputElement).value);
    if (!points) {
      return;
    }

    var chore: any = {};
    chore.name = name;
    chore.priority = priority;
    chore.points = points;
    postChore(chore, this.callBack);

  }

  callBack = (err: any, response: any) => {
    if (!err) {
      var parsedRes = JSON.parse(response);
      this.clearValues();
      this.setState({backendErrors: null, backendSuccess: parsedRes.message});
      this.props.refresh('asd');
    } else {
        this.setState({backendErrors: 'Server side error: ' + err, backendSuccess: null});
    }
  }

  parseName = (name: any) => {
    if (!name || name === '') {
      this.setState({errors: {name: 'This field is required'}});
      return null;
    }
    if (name.length < 1) {
      this.setState({errors: {name: 'Name is too short'}});
      return null;
    }
    if (name.length > 30) {
      this.setState({errors: {name: 'Name is too long  (< 30)'}});
      return null;
    }
    this.setState({errors: {name: null}});
    return name;
  }

  parsePriority = (priority: any) => {
    if (!priority || priority === '') {
      this.setState({errors: {priority: 'This field is required'}});
      return null;
    }
    var toNumber = parseInt(priority, 10);
    if (isNaN(toNumber)) {
      this.setState({errors: {priority: 'Only numbers allowed'}});
      return null;
    }
    if (toNumber < 0) {
      this.setState({errors: {priority: 'Only positive numbers allowed'}});
      return null;
    }
    this.setState({errors: {priority: null}});
    return toNumber;
  }

  parsePoints = (points: any) => {
    if (!points || points === '' ) {
      this.setState({errors: {points: 'This field is required'}});
      return null;
    }
    var toNumber = parseInt(points, 10);
    if (isNaN(toNumber)) {
      this.setState({errors: {points: 'Only numbers allowed'}});
      return null;
    }
    if (toNumber < 0) {
      this.setState({errors: {points: 'Only positive numbers allowed'}});
      return null;
    }
    this.setState({errors: {points: null}});
    return toNumber;
  }

  clearValues = () => {
    ( document.getElementById('chore-form-name') as HTMLInputElement ).value = '';
    ( document.getElementById('chore-form-priority') as HTMLInputElement ).value = '';
    ( document.getElementById('chore-form-points') as HTMLInputElement ).value = '';
  }

  render() {
    if ( this.state.backendSuccess ) {
      return <Redirect to="/" push={true} />;
    } else {
    return (
      <div className="form-component-container">
        <form onSubmit={this.handleSubmit}>
          <TextField
            id="chore-form-name"
            className="chore-form-input"
            hintText="Chore name"
            errorText={(this.state.errors && this.state.errors.name) ? this.state.errors.name : ''} /> <br />
          <TextField
            id="chore-form-priority"
            className="chore-form-input"
            hintText="How often this should be done? (hours)"
            type="number"
            errorText={(this.state.errors && this.state.errors.priority) ? this.state.errors.priority : ''} /> <br />
          <TextField
            id="chore-form-points"
            className="chore-form-input"
            hintText="Points awarded"
            type="number"
            errorText={(this.state.errors && this.state.errors.points ) ? this.state.errors.points : ''} /> <br />
          <RaisedButton label="Create" type="submit" />
          <div className="chore-error-div"><p>{this.state.backendErrors}</p></div>
          <div className="chore-success-div"><p>{this.state.backendSuccess}</p></div>
        </form>
      </div>
    );
  }
  }

}

export default NewChore;
