import * as React from 'react';


export class Profile extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            user: this.props.user
        };
    }

    render() {
        return (
           <h1>Hello, {this.state.user.username}</h1> 
        );
    }



}