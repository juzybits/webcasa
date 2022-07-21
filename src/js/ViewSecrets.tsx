import React from "react";

import { List, Row, NothingYet } from "./Common";

export class ViewSecrets extends React.Component {
    constructor(props) {
        super(props)
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        const w = this.props.wallet.getContents();
        this.state = {
            showWebcashes: true,
            showUnconfirmed: true,
            isEmpty: 0 === (w.webcash.length + w.unconfirmed.length)
        };
    }

    onCheckboxChange(event) {
        const target = event.target;
        this.setState({
            [target.value]: target.checked
        });
    }

    render() {
        const description = this.state.isEmpty ? '' :
            <div className="card-description">
                <p>
                    A "secret" is a string of text with some webcash associated to it.
                </p>
            </div>;
        return (
        <div className="view-wrapper">

            <header className="header">
                <h1><i className="icon-h1 icon-key"></i> Secrets</h1>
            </header>

            <div id="ViewSecrets" className="card">

                <NothingYet cond={this.state.isEmpty} msg="Your wallet is empty." />

                {description}

                {this.makeSecretSections()}

            </div>

        </div>
        );
    }
    private makeSecretSections() {
        if (this.state.isEmpty) {
            return '';
        }

        const wData = this.props.wallet.getContents();
        const weCount = wData.webcash.length;
        const unCount = wData.unconfirmed.length;

        const checkboxes =
        <fieldset className="checkboxes">
            <div className="check-item">
                <input type="checkbox" id="webcashes" value="showWebcashes"
                       defaultChecked={this.state.showWebcashes}
                       onChange={this.onCheckboxChange}/>
                <label htmlFor="webcashes">Valid secrets ({weCount})</label>
            </div>

            <div className="check-item">
                <input type="checkbox" id="unconfirmed" value="showUnconfirmed"
                       defaultChecked={this.state.showUnconfirmed}
                       onChange={this.onCheckboxChange}/>
                <label htmlFor="unconfirmed">Unconfirmed ({unCount})</label>
            </div>
        </fieldset>;

        function makeContents(type: string) {
            const rawItems = type==='Webcashes' ? wData.webcash : wData.unconfirmed;
            const title = type==='Webcashes' ? 'Valid secrets' : 'Unconfirmed';
            let key = 0;
            const items = rawItems.slice(0).reverse().map((x) =>
                <div className="list-item" key={key++}>
                    <Row contents={x} />
                </div>
            );
            return <React.Fragment>
                <h2>{title}</h2>
                <List items={items} />
            </React.Fragment>;
        }
        const webcashesSection = this.state.showWebcashes && weCount ? makeContents('Webcashes') : '';
        const unconfirmedSection = this.state.showUnconfirmed && unCount ? makeContents('Unconfirmed') : '';

        return <React.Fragment>
            {checkboxes}
            {webcashesSection}
            {unconfirmedSection}
        </React.Fragment>;
    }
}
