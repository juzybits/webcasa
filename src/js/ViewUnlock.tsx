import React from "react";

export class ViewUnlock extends React.Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            passwd: '',
            error: '',
        };
    }

    componentDidMount(){
        document.getElementById('passwd')?.focus();
    }

    onChange(event) {
        const target = event.target;
        this.setState({
            [target.id]: target.value,
            error: '',
        });
    }

    onSubmit() {
        event.preventDefault();
        const error = this.props.onUnlockWallet(this.state.passwd);
        this.setState({
            error: error
        });
        if (error) {
            document.getElementById('passwd').select();
        }
    }

    render() {
        return (
        <div id="ViewPassword" className="modal">

            <label className="modal-logo"><a href="/">🏠 WebCasa</a></label>

            <div className="modal-card">

                <h1><i className='icon-lock-solid'></i>Wallet locked</h1>

                <div className="card-description">
                    <p>
                        Enter your password below to unlock it.
                    </p>
                </div>

                <form className="pure-form pure-form-stacked" onSubmit={this.onSubmit}>
                    <fieldset>
                        <label htmlFor="passwd">Password</label>
                        <input type="password" id="passwd" minLength={6}
                               onChange={this.onChange}
                               spellCheck='false' autoCorrect='off' autoComplete='off'/>
                    </fieldset>

                    <label className="form-error">{this.state.error}</label>

                    <button type="submit" className="pure-button pure-button-primary">Unlock</button>
                </form>


            </div>
        </div>
        );
    }
}
