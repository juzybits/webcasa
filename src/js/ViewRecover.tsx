import React from "react";

import { ActionResult } from "./Common";

export class ViewRecover extends React.Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.exitOnEscape = this.exitOnEscape.bind(this);
        this.state = {
            masterSecret: this.props.wallet.getContents().master_secret,
            gapLimit: 20,
            inProgress: false,
        };
    }

    onChange(event) {
        event.preventDefault();
        const target = event.target;
        this.setState({
            [target.id]: target.value
        });
    }

    onFocus(event) {
        event.currentTarget.select();
    }

    async onSubmit() {
        event.preventDefault();
        this.setState({inProgress: true});
        const masterSecret = this.state.masterSecret;
        const gapLimit = this.state.gapLimit;
        await this.props.onRecoverWallet(masterSecret, gapLimit);
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
        const consoleLogs = 0===this.props.lastRecover.length ? '' :
            <div className="console-logs">{this.props.lastRecover}</div>;
        const submit = this.state.inProgress ? '' :
            <button type="submit" className="pure-button pure-button-primary">Recover</button>;
        const processing = !this.state.inProgress ? '' :
            <label className="label-processing">In progress...</label>;


        return (
        <div className="view-wrapper">
            <header className="header">
                <h1>Recover</h1>
            </header>

            <div id="ViewRecover" className="card closable">

                <a href="#" className="close-x" onClick={()=>this.props.onChangeView('Settings')}>✕</a>

                <div className="card-description">
                    <p>You can enter your "master secret" below to recover your wallet.</p>
                    <p>The "gap limit" is the maximum window span that will be used, on the assumption that any valid webcash will be found within the last item + gap limit number of secrets.</p>
                </div>

                <form className="pure-form pure-form-stacked" onSubmit={this.onSubmit}>
                    <fieldset>
                        <label htmlFor="masterSecret">master secret</label>
                        <input type="text" id="masterSecret" defaultValue={this.state.masterSecret}
                               autoFocus onFocus={this.onFocus} onChange={this.onChange}
                               spellCheck='false' autoCorrect='off'
                               disabled={this.state.inProgress} />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="gapLimit">gap limit</label>
                        <input type="number" id="gapLimit" min="1" defaultValue={this.state.gapLimit}
                               max="1000" step="1" onChange={this.onChange}
                               disabled={this.state.inProgress} />
                    </fieldset>

                    {submit}
                </form>

                {processing}
                {consoleLogs}
            </div>
        </div>
        );
    }
}
