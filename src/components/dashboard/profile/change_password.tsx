import * as React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


export class ChangePassword extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            user: this.props.user
        };
    }

    onSubmit = (event: any) => {
        event.preventDefault();

    }

    render () {
        return (
            <form onSubmit={this.onSubmit}>
                <TextField 
                    hintText="New password"
                />
                <TextField 
                    hintText="New Password again"
                />
                <RaisedButton label="asd" />
            </form>
        );
    }

}