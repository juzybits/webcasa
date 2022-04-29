import React from "react";

export class ViewPassword extends React.Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.exitOnEscape = this.exitOnEscape.bind(this);
        this.state = {
            newPass: '',
            confirmPass: '',
            // autolockMinutes: 15,
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

    onSubmit() {
        event.preventDefault();
        if (this.state.newPass !== this.state.confirmPass) {
            alert("Passwords don't match"); // TODO: pretty error
            return;
        }
        this.props.onSetPassword(this.state.newPass, /*autolockMinutes*/); // TODO
    }

    exitOnEscape(event) {
        if (event.key === "Escape") {
            this.props.onChangeView('Settings');
        }
    }
    componentDidMount() {
        document.addEventListener("keydown", this.exitOnEscape);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.exitOnEscape);
    }

    render() {
        return (
        <div className="view-wrapper">
            <header className="header">
                <h1>Set password</h1>
            </header>
            <div id="ViewPassword" className="card closable">

                <a href="#" className="close-x" onClick={(event) => {
                    event.preventDefault();
                    this.props.onChangeView('Settings');
                }}><i className="icon-circle-xmark"></i></a>

                <div className="card-description">
                    <p>
                        Choose a password to protect your wallet.
                    </p>
                </div>

                <form className="pure-form pure-form-stacked" onSubmit={this.onSubmit}>
                    <fieldset>
                        <label htmlFor="newPass">New password</label>
                        <input type="text" id="newPass" minLength="6"
                               onFocus={this.onFocus} onChange={this.onChange}
                               spellCheck='false' autoCorrect='off' autoComplete='off'/>
                    </fieldset>

                    <fieldset>
                        <label htmlFor="confirmPass">Confirm password</label>
                        <input type="text" id="confirmPass" minLength="6"
                               onFocus={this.onFocus} onChange={this.onChange}
                               spellCheck='false' autoCorrect='off' autoComplete='off'/>
                    </fieldset>

                    {/*<fieldset>
                        <label htmlFor="autolockMinutes">Autolock (minutes)</label>
                        <input type="number" id="autolockMinutes" min="1" defaultValue={this.state.autolock}
                               max="9999" step="1" onChange={this.onChange}
                               disabled={this.state.inProgress}
                               spellCheck='false' autoCorrect='off' autoComplete='off'/>
                    </fieldset>*/}

                    <button type="submit" className="pure-button pure-button-primary">Set password</button>
                </form>

            </div>
        </div>
        );
    }
}
