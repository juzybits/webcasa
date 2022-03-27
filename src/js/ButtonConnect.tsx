import React from "react";

export class ButtonConnect extends React.Component {
    render() {
        return (
            <div id="ButtonConnect" className="pure-u">
                <input type="file" id="wallet_file" name="wallet_file" onChange={this.props.onFileUpload}/>
            </div>
        );
    }
}
