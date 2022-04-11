import React from "react";

export class ViewTerms extends React.Component {

    constructor(props) {
        super(props)
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.state = {
            casaTerms: false,
            cashTerms: false,
            webcashTermsText: 'Fetching from webcash.org (please wait)',
        };
        // TODO: pull webcash terms text
    }

    onCheckboxChange(event) {
        const target = event.target;
        this.setState({
            [target.value]: target.checked
        });
    }

    makeCasaTerms() {
        return (
        <React.Fragment>
            <h1>🏠 Welcome to WebCasa<sup>(beta)</sup></h1>
            <p>
                WebCasa is a browser wallet for <a href="https://webcash.org" target="_blank">Webcash</a> (not affiliated).
            </p>
            <p>
                This is a non-custodial wallet. You are responsible for securing and backing up your wallet file.
            </p>
            <p>
                WebCasa is experimental software. It is offered for free and without any guarantees. There could be bugs so please use with care.
            </p>
            <div className="check-item">
                <input type="checkbox" id="casaTerms-chk" value="casaTerms" onChange={this.onCheckboxChange}/>
                <label htmlFor="casaTerms-chk">I understand.</label>
            </div>
        </React.Fragment>
        );
    }

    makeCashTerms() {
        return (
        <React.Fragment>
            <h1>Webcash terms of service</h1>
            <p>
                Even though WebCasa is not affiliated with Webcash, you must read and accept the Webcash.org <a href="https://webcash.org/terms" target="_blank">terms of service</a> before using the software.
            </p>
            <textarea class="modal-textarea" defaultValue={this.state.webcashTermsText} />
            <div className="check-item">
                <input type="checkbox" id="cashTerms-chk" value="cashTerms" onChange={this.onCheckboxChange}/>
                <label htmlFor="cashTerms-chk">I agree to the Webcash.org <a href="https://webcash.org/terms" target="_blank">terms of service</a>.</label>
            </div>
        </React.Fragment>
        );
    }

    render() {
        const terms = !this.state.casaTerms ? this.makeCasaTerms() : this.makeCashTerms();
        return (
        <div id="ViewTerms" className="modal">
            <div className="modal-card">
                {terms}
            </div>
        </div>
        );
    }
}
