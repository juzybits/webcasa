import React from "react";

export class ButtonConnect extends React.Component {
    render() {
        return (
            <div id="ButtonConnect">
                <label className="primary-button pure-button" htmlFor="input_file">{this.props.buttonLabel}</label>
                <input type="file" id="input_file" name="input_file" onChange={this.props.onFileUpload}/>
            </div>
        );
    }
}
