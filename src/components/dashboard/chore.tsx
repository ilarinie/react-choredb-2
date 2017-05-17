import FontIcon from 'material-ui/FontIcon';
import * as React from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import ApiService from '../../services/api_service';
import { Chore } from '../../store/types/chore';
import { ErrorHandler } from './error_handler';

export class ChoreComponent extends React.Component<any,
  any> {

  constructor(props: any) {
    super(props);
    this.state = {
      chore: this.props.chore,
      user: this.props.user,
      done: false,
      late: false,
      loading: false
    };

  }

  componentDidMount = () => {
    this.isChoreLate(this.state.chore);
  }

  isChoreLate = (chore: Chore) => {
    if (chore.lastdone) {
      if (new Date().getTime() > new Date(chore.lastdone).getTime() + chore.priority * 60 * 1000) {
        this.setState({ late: true });
      }
    }
  }

  completeChoreHandler = () => {
    this.setState({
      loading: true
    });
    ApiService.completeChore(this.state.chore, (err: any, res: any) => {
      this.setState({
        loading: false
      });
      if (!err) {
        this.markChoreDone();
      } else {
        this.setState({
          errorObject: err
        });
      }
    });
  }

  markChoreDone = () => {
    var newChore = this.state.chore;
    newChore.lastdone = new Date().toString();
    newChore.lastdoer = this.state.user.username;
    this.setState({
      chore: newChore,
      done: true,
      late: false
    });
  }

  render() {
    var button;

    if (this.state.done) {
      button =  <RaisedButton buttonStyle={{background: 'green', color:'white'}} disabled={true} label="Done" icon={<FontIcon className="fa fa-check checkmark" />} />;
    } else if (this.state.loading) {
      button = <RaisedButton disabled={true} icon={<FontIcon className="fa fa-check fa fa-spinner fa-spin fa-fw" />} />;
    } else {
      button = <RaisedButton secondary={true} label="Do" onClick={this.completeChoreHandler} />;
    }


    return (
      <TableRow
        style={this.state.late
          ? {
            background: '#D32F2F'
          }
          : {}}
      >
        <TableRowColumn>{this.state.chore.chorename}</TableRowColumn>
        <TableRowColumn>{this.state.chore.lastdoer}</TableRowColumn>
        <TableRowColumn>{this.state.chore.lastdoer
          ? new Date(this.state.chore.lastdone).toLocaleString()
          : ''}</TableRowColumn>
        <TableRowColumn>
            {button}
            < ErrorHandler errorObject={this.state.errorObject} />
        </TableRowColumn>
      </TableRow>
    );
  }
}
