import React from "react";

import { BalanceIndicator } from "./BalanceIndicator";
import { List, makeItemRow } from "./List";

export class ViewSecrets extends React.Component {
    constructor(props) {
        super(props)
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.state = {
            showWebcashes: true,
            showUnconfirmed: true,
        };
    }

    handleCheckboxChange(event) {
        const target = event.target;
        this.setState({
            [target.value]: target.checked
        });
    }

    private makeSection(type: string) {
        const wData = this.props.wallet.getContents();
        const rawItems = type==='Webcashes' ? wData.webcash : wData.unconfirmed;
        let key = 0;
        const items = rawItems.slice(0).reverse().map((x) =>
            <div className="list-item" key={key++}>{makeItemRow('', x)}</div>
        );

        return <React.Fragment>
            <h2>{type}</h2>
            <List items={items} />
        </React.Fragment>;
    }

    render() {
        const webcashesSection = this.state.showWebcashes ? this.makeSection('Webcashes') : '';
        const unconfirmedSection = this.state.showUnconfirmed ? this.makeSection('Unconfirmed') : '';
        return (
            <div id="ViewSecrets" className="pure-u card">

                <h1>Secrets</h1>

                <fieldset className="checkboxes">

                    <div className="check-item">
                        <input type="checkbox" id="webcashes" value="showWebcashes"
                               defaultChecked={this.state.showWebcashes}
                               onChange={this.handleCheckboxChange}/>
                        <label htmlFor="webcashes">Webcashes</label>
                    </div>

                    <div className="check-item">
                        <input type="checkbox" id="unconfirmed" value="showUnconfirmed"
                               defaultChecked={this.state.showUnconfirmed}
                               onChange={this.handleCheckboxChange}/>
                        <label htmlFor="unconfirmed">Unconfirmed</label>
                    </div>

                </fieldset>

                {webcashesSection}
                {unconfirmedSection}

            </div>
        );
    }
}
