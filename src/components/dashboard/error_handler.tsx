import * as React from 'react';

export class ErrorHandler extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            errorString: this.props.errorString
        };
    }

    render() { 
        if (this.state.errorObject) {
            return (
                <div className="error-display">
                    <p>Error: - {this.state.errorString}
                    </p>
                </div>
            );
        } else {
            return (
                <div className="error-display-hidden">
                    <p>a</p>
                </div>
            );
        }
        
    }    

}

export default ErrorHandler;