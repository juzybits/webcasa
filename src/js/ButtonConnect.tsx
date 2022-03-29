import React from "react";

export class ButtonConnect extends React.Component {
    render() {
        return (
            <div id="ButtonConnect">
                <label className="primary-button pure-button" htmlFor="connect-input-file">{this.props.buttonLabel}</label>
                <input type="file" id="connect-input-file" name="connect-input-file" onChange={this.props.onFileUpload}/>
            </div>
        );
    }
}
