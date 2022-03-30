import React from "react";

export class ButtonConnect extends React.Component {
    render() {
        return (
            <div className="ButtonConnect">
                <label className="pure-button" htmlFor="bc-file-input">{this.props.buttonLabel}</label>
                <input type="file" id="bc-file-input" className="connect-file-input" name="connect-file-input" onChange={this.props.handleUploadWallet}/>
            </div>
        );
    }
}
