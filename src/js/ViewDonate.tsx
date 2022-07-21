import React from "react";

import { CopiableValue } from "./Common";

export class ViewDonate extends React.Component {
    /*
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            webcash: '',
        };
    }

    onChange(event) {
        this.setState({
            webcash: event.target.value,
        });
    }

    onSubmit() {
        event.preventDefault();
        alert("TODO");
    }
    */

    render() {
        return (
        <div className="view-wrapper">

            <header className="header">
                <h1><i className="icon-h1 icon-gift-solid"></i> Donate</h1>
            </header>

            <div id="ViewDonate" className="card">

            <p>
                Thank you for your support!
                <br/>
                <br/>
            </p>

            <p>
                Bitcoin:<br/>
                <CopiableValue contents="bc1qcyh5e066trnnr3zds5mvmj4jlkkrleuukfaxr6"/>
            </p>
            <p>
                Ethereum / EVM:<br/>
                <CopiableValue contents="0x9Da62ba08Ea4968396aBD900B1cE44EeeE77f837"/>
            </p>

            {/*<form className="pure-form pure-form-stacked" onSubmit={this.onSubmit}>
                <fieldset>
                    <label htmlFor="webcash-amount">Webcash</label>
                    <input type="text" id="webcash-amount" onChange={this.onChange}
                           required value={this.state.webcash}
                           spellCheck='false' autoCorrect='off' autoComplete='off'/>
                </fieldset>
                <div>
                    <button type="submit" className="pure-button pure-button-primary">
                        Send
                    </button>
                </div>
            </form>*/}
            </div>


        </div>
        );
    }
}
