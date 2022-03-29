import React from "react";

import { randomId } from "./_util";

export class ButtonConnect extends React.Component {
    render() {
        return (
            <div className="ButtonConnect">
                <label className="pure-button primary-button" htmlFor="connect-file-input">{this.props.buttonLabel}</label>
                <input type="file" id="connect-file-input" className="connect-file-input" name="connect-file-input" onChange={this.props.handleWalletUpload}/>
            </div>
        );
    }
}
