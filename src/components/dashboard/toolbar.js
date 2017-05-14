import React, {
    Component
} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export class Toolbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      disabled: this.props.disabled,
      title: "ChoreDB 2.0 - "+ this.props.communeName
    };
  }



  handleToggle = () => {
    this.setState({open: !this.state.open});
  }

  handleClose = (e) => {
    //console.log(e)
    //this.props.onClick(e);
    this.setState({open: false});
  }

  render() {

    //let choreClick = this.props.onClick.bind(this, 'chore');
    //let budgetClick = this.props.onClick.bind(this, "budget");
    if (this.state.disabled){
      return <AppBar iconElementLeft={null} title="ChoreDB 2.0" />
    } else {
      console.log("asd " +this.state.title)
      return (
        <div>
          <AppBar
            title={this.state.title}
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonTouchTap={this.handleToggle}
          />
          <Drawer open={this.state.open}
                  docked={false}
                  width={200}
                  onRequestChange={(open) => this.setState({open})}
            >
            <MenuItem onTouchTap={this.props.onClick("123")}>Chores</MenuItem>
            <MenuItem onTouchTap={this.props.onClick("123")}>Budget</MenuItem>
            <MenuItem onTouchTap={this.props.onClick("123")}>New Chore</MenuItem>
            <MenuItem onTouchTap={this.props.onClick("123")}>New Purchase</MenuItem>
            <MenuItem onTouchTap={this.props.onClick("123")}>Log Out</MenuItem>
          </Drawer>
        </div>
      );
    }

  }

}
