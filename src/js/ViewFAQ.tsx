import React from "react";

export class ViewFAQ extends React.Component {
    render() {
        return (
        <div className="view-wrapper">

            <header className="header">
                <h1>Frequently Asked Questions</h1>
            </header>

            <div id="ViewFAQ" className="card">

                <div className="faq-wrapper">
                    <h2 className="faq-title">What is WebCasa?</h2>
                    <div className="faq-answer">
                        <p>
                            WebCasa is a browser wallet for <i>webcash</i> tokens.
                        </p>
                        <p>
                            WebCasa is non-custodial: only you have access to your funds, and you are responsible for backing up your wallet.
                        </p>
                        <p>
                            WebCasa is a serverless app: all communication happens directly between your browser and     Webcash.
                        </p>
                    </div>
                    <h2 className="faq-title">What is Webcash?</h2>
                    <div className="faq-answer">
                        <p>
                            <a href="https://webcash.org" target="_blank">Webcash</a> is an experimental electronic cash system that enables instant global payments.
                        </p>
                        <p>
                            Users send webcash to one another directly on a peer-to-peer basis by copying-and-pasting their webcash to their recipient.

                        </p>
                        <p>The central server helps webcash wallets detect double-spending and ensure the integrity of the monetary supply.
                        </p>
                        <p>
                        Learn how Webcash works: <a href="https://webcash.org/webcash-slides.pdf" target="_blank">https://webcash.org/webcash-slides.pdf</a>
                        </p>
                    </div>
                </div>

            </div>

        </div>
        );
    }
}
