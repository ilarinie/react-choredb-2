import * as React from 'react';
import {CircularProgress} from "material-ui";


export class LoadingScreen extends React.Component<any, any> {
    render() {
        return(
            <div className="loading-screen">
                <h2>{this.props.message ? this.props.message : ''}</h2>
                <CircularProgress size={200}/>
            </div>
        )
    }
}