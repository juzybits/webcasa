import React from "react";

import { CopiableValue } from "./Common";

export class ViewAbout extends React.Component {
    render() {
        return (
        <div className="view-wrapper">

            <header className="header">
                <h1><i className="icon-h1 icon-circle-question-solid"></i> About</h1>
            </header>

            <div id="ViewAbout" className="card">

                <div className="about-wrapper">
                    <h2 className="about-title">What is WebCasa?</h2>
                    <div className="about-answer">
                        <p>
                            WebCasa is a browser wallet for <i>webcash</i> tokens.
                        </p>
                        <p>
                            It is non-custodial: only you have access to your funds, and you are responsible for backing up your wallet.
                        </p>
                        <p>
                            It is serverless: your browser communicates directly with Webcash™. You can even download the app and self-host it.
                        </p>
                        <p>
                        Get in touch: <a className="social-icon" href="https://twitter.com/WebCasaApp" target="_blank">Twitter</a>
                        , <a className="social-icon" href="https://discord.com/invite/seYMuUyZus" target="_blank">Discord</a>
                        , <a className="social-icon" href="https://github.com/juzybits/webcasa" target="_blank">Github</a>.

                        </p>
                    </div>

                    <h2 className="about-title">What is Webcash™?</h2>
                    <div className="about-answer">
                        <p>
                            <a href="https://webcash.org" target="_blank">Webcash</a> is an experimental electronic cash system that enables instant global payments
                            (<a href="https://webcash.org/webcash-slides.pdf" target="_blank">slides</a>,
                            &nbsp;<a href="https://discord.com/invite/qf95KMqkPW" target="_blank">Discord</a>).
                        </p>
                        <p>
                            Users send webcash to one another directly on a peer-to-peer basis by copying-and-pasting their webcash to their recipient.

                        </p>
                        <p>
                            A central server helps webcash wallets detect double-spending and ensure the integrity of the monetary supply.
                        </p>
                    </div>

                    <h2 className="about-title">Do you accept donations?</h2>
                    <div className="about-answer">
                        <p>
                            Yes! Thank you for supporting the development of WebCasa:
                        </p>
                        <div>
                            - Bitcoin: <CopiableValue contents="bc1qcyh5e066trnnr3zds5mvmj4jlkkrleuukfaxr6"/>
                            <br/>
                            - Ethereum / EVM: <CopiableValue contents="0x9Da62ba08Ea4968396aBD900B1cE44EeeE77f837"/>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        );
    }
}
