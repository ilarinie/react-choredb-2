import React, {
    Component
} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
//import { Chore } from './chore';

export class Chores extends Component {


  constructor(props){
    super(props);
    this.state = {
       chores: this.props.chores
    }
  }
  getInitialState() {
    return {}
  }

  completeChore(chore, param2){
    console.log(param2)
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/chores/"+chore.chore_id+"/do");
    xhr.setRequestHeader("Authorization", "JWT " + localStorage.getItem('token'));
    var asd = "asd"
    xhr.onreadystatechange = function(event) {
      if (xhr.readyState === 4){
        changeState();
      }
    }

    var ctx = this;

    function changeState() {
      console.log("asd")
      var chores2 = ctx.state.chores;
      for (var i = 0; i < ctx.state.chores.length; i++){
        if (chores2[i].chore_id === chore.chore_id) {
          chores2[i].lastdone = new Date().toString();
        }
      }
      ctx.setState({chores: chores2});
    }
    xhr.send();
  }


  render() {
    var choreNodes = this.state.chores.map( (chore, index) => (
        <TableRow key={index} >
          <TableRowColumn>{chore.name}</TableRowColumn>
          <TableRowColumn>{chore.lastdone}</TableRowColumn>
          <TableRowColumn><button id={chore.id} value={chore.id} label="Do" onClick={this.completeChore.bind(this, chore)} > Do </button></TableRowColumn>
        </TableRow>
      ), this);

    return (
      <Table selectable={false}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Chore</TableHeaderColumn>
            <TableHeaderColumn>Last done</TableHeaderColumn>
            <TableHeaderColumn>Do</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {choreNodes}
        </TableBody>
      </Table>
    );
  }



}
