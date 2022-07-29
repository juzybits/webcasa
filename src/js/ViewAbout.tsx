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
                            WebCasa is non-custodial: only you have access to your funds, and you are responsible for backing up your wallet.
                        </p>
                        <p>
                            WebCasa is a serverless app: your browser communicates directly with Webcash™.
                        </p>
                        <p>
                            Support the development of WebCasa:
                        </p>
                        <div>
                            - Bitcoin: <CopiableValue contents="bc1qcyh5e066trnnr3zds5mvmj4jlkkrleuukfaxr6"/>
                            <br/>
                            - Ethereum / EVM: <CopiableValue contents="0x9Da62ba08Ea4968396aBD900B1cE44EeeE77f837"/>
                        </div>
                    </div>
                    <h2 className="about-title">What is Webcash™?</h2>
                    <div className="about-answer">
                        <p>
                            <a href="https://webcash.org" target="_blank">Webcash</a> is an experimental electronic cash system that enables instant global payments.
                        </p>
                        <p>
                            Users send webcash to one another directly on a peer-to-peer basis by copying-and-pasting their webcash to their recipient.

                        </p>
                        <p>
                            A central server helps webcash wallets detect double-spending and ensure the integrity of the monetary supply.
                        </p>
                        <p>
                            - <a href="https://webcash.org/webcash-slides.pdf" target="_blank">Webcash PDF</a>
                        </p>
                        <p>
                            - <a href="https://discord.com/invite/qf95KMqkPW">Webcash Discord</a>
                        </p>
                    </div>
                </div>

            </div>

        </div>
        );
    }
}
