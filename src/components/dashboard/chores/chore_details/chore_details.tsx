import * as React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {ChoreInfo} from './chore_info';
import {ChoreEdit} from './chore_edit';

export class ChoreDetails extends React.Component < any,
any > {

    constructor(props : any) {
        super(props);
        let index = this.parseLocationParam();
        this.state = {
            chore: this.props.chores[index],
            value: 'info'
        };
    }

    parseLocationParam = () => {
        let loc = location.pathname;
        let locArray = loc.split('/');
        return locArray[locArray.length - 1];
    }

    handleChange = (value : any) => {
        this.setState({value: value});
    }
    render() {
        return (
            <Tabs value={this.state.value} onChange={this.handleChange}>
                <Tab label="Chore Stats" value="info">
                    <ChoreInfo chore={this.state.chore}/>
                </Tab>
                <Tab label="Edit Chore" value="edit">
                    <ChoreEdit chore={this.state.chore}/>
                </Tab>
            </Tabs>

        );
    }
}