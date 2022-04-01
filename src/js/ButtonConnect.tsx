import React from "react";

export class ButtonConnect extends React.Component {
    render() {
        const fragment = this.props.saved ?
            <React.Fragment>
                <label className="pure-button" htmlFor="bc-file-input">{this.props.label}</label>
                <input type="file" id="bc-file-input" className="connect-file-input" name="connect-file-input"
                       onChange={this.props.handleUploadWallet}/>
            </React.Fragment>
        :
            <React.Fragment>
                <button className="pure-button unsaved" onClick={this.props.handleDownloadWallet}>Save changes</button>
            </React.Fragment>
        ;
        return (
            <div className="ButtonConnect">
            {fragment}
            </div>
        );
    }
}
