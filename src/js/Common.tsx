import React from "react";

import { makeItemRow } from "./List";

export class ActionResult extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contents: '',
            label: '',
            logs: [],
            // clazz: '',
        };
    }
    render() {
        let contents = '';
        let clazz = '';
        if (this.props.success===true) {
            contents = makeItemRow(this.props.label, this.props.contents);
            clazz = 'success';
        } else
        if (this.props.success===false) {
            contents = this.props.contents;
            clazz = 'failure';
        }
        return <div className={`action-result ${clazz}`}>{contents}</div>;
    }
}
