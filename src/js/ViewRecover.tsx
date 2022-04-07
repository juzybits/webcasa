import React from "react";

import { ActionResult } from "./Common";
/*
ON HOLD
Found issues with inconsisten decimal parsing in py vs js
"e1998.99999800" (py) vs "e1998.999998" (js)
and "e1E" (py) vs "e1e" (js)

*/
export class ViewRecover extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.exitOnEscape = this.exitOnEscape.bind(this);
        this.state = {
            masterSecret: this.props.wallet.getContents().master_secret,
            gapLimit: 20,
            lastResult: <ActionResult success={null} contents={null} label={this.label} />,
        };
    }

    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        this.setState({
            [target.id]: target.value
        });
    }

    async handleSubmit() {
        event.preventDefault();
        const masterSecret = this.state.masterSecret;
        const gapLimit = this.state.gapLimit;
        console.log(masterSecret, gapLimit);
        try {
            // dev-only Recover local wallet, just to test
            let wallet = this.props.wallet;
            console.log("0: Starting")
            let r1 = await wallet.recover();
            console.log("1:", r1)
            let r2 = await Promise.resolve();
            console.log("2:", r2)
            // let wallet = new WebcashWallet({"master_secret": masterSecret});
            // wallet.setLegalAgreementsToTrue();
            // await wallet.recover();
            // await Promise.resolve();

            // const webcash = await this.props.wallet.pay(amount, memo);
            // this.setState({ lastResult: <ActionResult success={true} contents={webcash} label={this.label} /> });
            // this.props.handleModifyWallet(); // TODO deprecated

        } catch (e) {
            const errMsg = <div className="action-error">{`ERROR: ${e.message} (masterSecret=${masterSecret}, gapLimit=${gapLimit})`}</div>;
            this.setState({ lastResult: <ActionResult success={false} contents={errMsg} label={this.label} /> });
        }
    }

    exitOnEscape(event){
        if (event.key === "Escape") {
            this.props.showView('Settings');
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

            <a href="#" className="close-x" onClick={()=>this.props.showView('Settings')}>✕</a>

            <div className="card-description">
                You can enter your "master secret" below to recover your wallet.
                <p>
                The "gap limit" is the maximum window span that will be used, on the assumption that any valid webcash will be found within the last item + gap limit number of secrets.
                </p>
            </div>

            <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit}>
                <fieldset>
                    <label htmlFor="masterSecret">master secret</label>
                    <input type="text" id="masterSecret" defaultValue={this.state.masterSecret} onChange={this.handleChange} />
                </fieldset>

                <fieldset>
                    <label htmlFor="gapLimit">gap limit</label>
                    <input type="number" id="gapLimit" min="1" defaultValue={this.state.gapLimit} max="1000" step="1" onChange={this.handleChange} />
                </fieldset>

                <button type="submit" className="pure-button pure-button-primary">Recover</button>
            </form>

            {/*{this.state.lastResult}*/}

        </div>
        );
    }
}
