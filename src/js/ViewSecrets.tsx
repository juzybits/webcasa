import React from "react";

import { List, makeItemRow } from "./List";

export class ViewSecrets extends React.Component {
    constructor(props) {
        super(props)
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.state = {
            showWebcashes: true,
            showUnconfirmed: true,
        };
    }

    onCheckboxChange(event) {
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

                <fieldset className="checkboxes">

                    <div className="check-item">
                        <input type="checkbox" id="webcashes" value="showWebcashes"
                               defaultChecked={this.state.showWebcashes}
                               onChange={this.onCheckboxChange}/>
                        <label htmlFor="webcashes">Webcashes</label>
                    </div>

                    <div className="check-item">
                        <input type="checkbox" id="unconfirmed" value="showUnconfirmed"
                               defaultChecked={this.state.showUnconfirmed}
                               onChange={this.onCheckboxChange}/>
                        <label htmlFor="unconfirmed">Unconfirmed</label>
                    </div>

                </fieldset>

                {webcashesSection}
                {unconfirmedSection}

            </div>
        );
    }
}
