import React from "react";

export class ButtonDownload extends React.Component {
    render() {
        const fragment = this.props.saved ?
            <React.Fragment>
                <button className="pure-button" onClick={this.props.handleDownloadWallet}>{this.props.label}</button>
            </React.Fragment>
        :
            <React.Fragment>
                <button className="pure-button unsaved" onClick={this.props.handleDownloadWallet}>Save changes</button>
            </React.Fragment>
        ;
        return (
            <div className="ButtonDownload">
            {fragment}
            </div>
        );
    }
}
