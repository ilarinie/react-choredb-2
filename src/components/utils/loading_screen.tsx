import * as React from 'react';
import {CircularProgress} from "material-ui";


export class LoadingScreen extends React.Component<any, any> {
    render() {
        return(
            <div className="loading-screen">
                <h2>Fetching some super duper important data</h2>
                <h2>from the nether realms</h2>
                <CircularProgress size={200}/>
            </div>
        )
    }
}