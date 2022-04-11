import React from "react";

export class ViewTerms extends React.Component {

    constructor(props) {
        super(props)
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            accept: true,
        };
    }

    onCheckboxChange(event) {
        this.setState({accept: event.target.checked});
    }

    onSubmit() {
        event.preventDefault();
        if (this.state.accept) {
            this.props.onAcceptTerms();
        } else {
            alert("Please read and accept the terms");
        }
    }

    render() {
        const webcashTerms = "TODO pull terms from webcash.org";
        return (
        <div id="ViewTerms" className="modal">
            <div className="modal-card">
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
                    <input type="checkbox" id="accept-terms-chk" value="accept" onChange={this.onCheckboxChange}/>
                    <label htmlFor="accept-terms-chk">I understand</label>
                </div>
                {/*
                <p>
                    Even though WebCasa is not affiliated with Webcash, you must read and accept the Webcash.org <a href="https://webcash.org/terms" target="_blank">Terms of Service</a> before continuing.
                </p>
                <textarea class="modal-textarea">
                    {webcashTerms}
                </textarea>
                <div className="check-item">
                    <input type="checkbox" id="accept-terms-chk" value="accept" onChange={this.onCheckboxChange}/>
                    <label htmlFor="accept-terms-chk">I acknowledge and agree to the Webcash.org <a href="https://webcash.org/terms" target="_blank">Terms of Service</a></label>
                </div>
                */}
            </div>
        </div>
        );
    }
}
