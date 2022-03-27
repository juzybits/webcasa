import React from "react";

export class PageConnect extends React.Component {
    render() {
        return (
            <div id="PageConnect" className="pure-u">
                <input type="file" id="wallet_file" name="wallet_file" onChange={this.props.onFileUpload}/>
            </div>
        );
    }
}
