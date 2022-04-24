import React from "react";

export class ViewCheck extends React.Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
        this.exitOnEscape = this.exitOnEscape.bind(this);
        this.state = {
            inProgress: false,
        };
    }

    async onSubmit() {
        event.preventDefault();
        this.setState({inProgress: true});
        await this.props.onCheckWallet();
        this.setState({inProgress: false});
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
        const consoleLogs = 0===this.props.lastCheck.length ? '' :
            <div className="console-logs">{this.props.lastCheck}</div>;
        const submit = this.state.inProgress ? '' :
            <button type="submit" className="pure-button pure-button-primary">Check webcash</button>;
        const processing = !this.state.inProgress ? '' :
            <label className="label-processing">In progress...</label>;

        return (
        <div className="view-wrapper">
            <header className="header">
                <h1>Check webcash</h1>
            </header>
            <div id="ViewCheck" className="card closable">

                <a href="#" className="close-x" onClick={(event) => {
                    event.preventDefault();
                    this.props.onChangeView('Settings');
                }}><i className="icon-circle-xmark"></i></a>

                <div className="card-description">
                <p>
                    Check every webcash in the wallet and remove any invalid already-spent webcash.
                </p>
                </div>

                <form className="pure-form pure-form-stacked" onSubmit={this.onSubmit}>
                    {submit}
                </form>

                {processing}
                {consoleLogs}
            </div>
        </div>
        );
    }
}
