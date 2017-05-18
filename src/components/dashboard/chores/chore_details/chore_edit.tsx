import * as React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import {ChoreForm} from '../chore_form';

export class ChoreEdit extends React.Component < any,
any > {

    render() {
        return (
            <div>
                <ChoreForm chore={this.props.chore} />
            </div>
        );
    }

}