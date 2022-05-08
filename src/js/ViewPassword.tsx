import React from "react";

import { tooltip } from "./_util";

export class ViewPassword extends React.Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onSetPassword = this.onSetPassword.bind(this);
        this.onRemovePassword = this.onRemovePassword.bind(this);
        this.exitOnEscape = this.exitOnEscape.bind(this);
        this.state = {
            newPass: '',
            confirmPass: '',
            error: '',
        };
    }

    exitOnEscape(event) {
        if (event.key === 'Escape') {
            this.props.onChangeView('Settings');
        }
    }
    componentDidMount() {
        document.addEventListener('keydown', this.exitOnEscape);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.exitOnEscape);
    }

    onFocus(event) {
        event.currentTarget.select();
    }

    onChange(event) {
        event.preventDefault();
        const target = event.target;
        this.setState({
            [target.id]: target.value,
            error: '',
        });
    }

    onSetPassword() {
        event.preventDefault();
        let err = '';
        if (this.state.newPass !== this.state.confirmPass) {
            err = "Passwords don't match";
        } else
        if (this.state.newPass.length < 6) {
            err = "Password is too short";
        }

        if (err) {
            this.setState({ error: err });
        } else {
            this.props.onSetPassword(this.state.newPass);
            this.props.onChangeView('Transfers');
            tooltip("Success");
        }
    }

    onRemovePassword() {
        this.props.onSetPassword(null);
        this.props.onChangeView('Transfers');
        tooltip("Success");
    }

    formSetPassword() {
        return <React.Fragment>
            <div className="card-description">
                <p>
                    Keep your wallet safe behind a wall of encrypted energy.
                </p>
            </div>

            <form className="pure-form pure-form-stacked" onSubmit={this.onSetPassword}>
                <fieldset>
                    <label htmlFor="newPass">New password</label>
                    <input type="password" id="newPass" minLength="6"
                           onFocus={this.onFocus} onChange={this.onChange}
                           spellCheck='false' autoCorrect='off' autoComplete='off'/>
                </fieldset>

                <fieldset>
                    <label htmlFor="confirmPass">Confirm password</label>
                    <input type="password" id="confirmPass" minLength="6"
                           onFocus={this.onFocus} onChange={this.onChange}
                           spellCheck='false' autoCorrect='off' autoComplete='off'/>
                </fieldset>

                <label className="form-error">{this.state.error}</label>

                <button type="submit" className="pure-button pure-button-primary">Set password</button>
            </form>
        </React.Fragment>;

    }

    formRemovePassword() {
        return !this.props.hasPassword ? '' :
        <div id="form-remove-pass">
            <div className="card-description">
                Without a password, anyone with access to your browser can see your wallet and take your webcash.
            </div>

            <button className="pure-button btn-orange" onClick={this.onRemovePassword}>Remove password</button>
        </div>;
    }

    render() {
        return <div className="view-wrapper">

            <h1><i className='button-icon icon-unlock-solid'></i>Set password</h1>

            <div id="ViewPassword" className="card closable">

                <a href="#" className="close-x" onClick={(event) => {
                    event.preventDefault();
                    this.props.onChangeView('Settings');
                }}><i className="icon-circle-xmark"></i></a>

                {this.formSetPassword()}

                {this.formRemovePassword()}

            </div>

        </div>;
    }
}
