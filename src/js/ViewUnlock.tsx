import React from "react";

export class ViewUnlock extends React.Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            passwd: ''
        };
    }

    onChange(event) {
        event.preventDefault();
        const target = event.target;
        this.setState({
            [target.id]: target.value
        });
    }

    onSubmit() {
        event.preventDefault();
        this.props.onUnlockWallet(this.state.passwd); // TODO: pretty errors
    }

    render() {
        return (
        <div id="ViewPassword" className="modal">

            <label className="modal-logo"><a href="/">🏠 WebCasa<sup>(beta)</sup></a></label>

            <div className="modal-card">


                <h1>Wallet is locked</h1>

                <div className="card-description">
                    <p>
                        Enter your password below to unlock it.
                    </p>
                </div>

                <form className="pure-form pure-form-stacked" onSubmit={this.onSubmit}>
                    <fieldset>
                        <label htmlFor="passwd">Password</label>
                        <input type="text" id="passwd" minLength="6"
                               onFocus={this.onFocus} onChange={this.onChange}
                               spellCheck='false' autoCorrect='off' autoComplete='off'/>
                    </fieldset>

                    <button type="submit" className="pure-button pure-button-primary">Unlock</button>
                </form>

            </div>
        </div>
        );
    }
}
