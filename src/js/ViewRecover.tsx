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
            lastResult: <ActionResult success={null} contents={null} label={this.label} />,
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
        const masterSecret = this.state.masterSecret;
        const gapLimit = this.state.gapLimit;
        // TODO: prevent user from navigating away
        await this.props.onRecoverWallet(masterSecret, gapLimit);
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
        return(
        <div id="ViewRecover" className="pure-u card">

            <a href="#" className="close-x" onClick={()=>this.props.onChangeView('Settings')}>✕</a>

            <div className="card-description">
                You can enter your "master secret" below to recover your wallet.
                <p>
                The "gap limit" is the maximum window span that will be used, on the assumption that any valid webcash will be found within the last item + gap limit number of secrets.
                </p>
            </div>

            <form className="pure-form pure-form-stacked" onSubmit={this.onSubmit}>
                <fieldset>
                    <label htmlFor="masterSecret">master secret</label>
                    <input type="text" id="masterSecret" defaultValue={this.state.masterSecret}
                           autoFocus onFocus={this.onFocus} onChange={this.onChange}
                           spellCheck='false' autoCorrect='off' />
                </fieldset>

                <fieldset>
                    <label htmlFor="gapLimit">gap limit</label>
                    <input type="number" id="gapLimit" min="1" defaultValue={this.state.gapLimit} max="1000" step="1" onChange={this.onChange} />
                </fieldset>

                <button type="submit" className="pure-button pure-button-primary">Recover</button>
            </form>

            <pre>
                {this.props.lastRecover}
            </pre>

        </div>
        );
    }
}
