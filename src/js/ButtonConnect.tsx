import React from "react";

import { randomId } from "./_util";

export class ButtonConnect extends React.Component {
    render() {
        const elementId = randomId('connect-file-input');
        return (
            <div className="ButtonConnect">
                <label className="primary-button pure-button" htmlFor={elementId}>{this.props.buttonLabel}</label>
                <input type="file" id={elementId} className="connect-file-input" name="connect-file-input" onChange={this.props.handleWalletUpload}/>
            </div>
        );
    }
}
