import React from "react";

import { ActionResult } from "./Common";

export class ViewCheck extends React.Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
        this.exitOnEscape = this.exitOnEscape.bind(this);
        this.state = {
            inProgress: false,
        };
    }

    async onSubmit() {
        event.preventDefault();
        this.setState({inProgress: true});
        await this.props.onCheckWallet();
        this.setState({inProgress: false});
    }

    exitOnEscape(event){
        if (event.key === "Escape") {
            this.props.onChangeView('Settings');
        }
    }
    componentDidMount(){
        document.addEventListener("keydown", this.exitOnEscape);
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.exitOnEscape);
    }

    render() {
        const consoleLogs = 0===this.props.lastCheck.length ? '' :
            <div className="console-logs">{this.props.lastCheck}</div>;
        const submit = this.state.inProgress ? '' :
            <button type="submit" className="pure-button pure-button-primary">Check</button>;
        const processing = !this.state.inProgress ? '' :
            <label className="label-processing">In progress...</label>;

        return <div id="ViewCheck" className="pure-u card">

            <a href="#" className="close-x" onClick={()=>this.props.onChangeView('Settings')}>✕</a>

            <div className="card-description">
                Check every webcash in the wallet and remove any invalid already-spent webcash.
            </div>

            <form className="pure-form pure-form-stacked" onSubmit={this.onSubmit}>
                {submit}
            </form>

            {processing}
            {consoleLogs}

        </div>;
    }
}
