/** Reusable React components **/

import React from "react";

import { tooltip, shorten } from "./_util";

export function ActionResult(props) {
    let contents = '';
    let clazz = '';
    if (props.success===true) {
        contents = <Row title={props.title} contents={props.contents} />;
        clazz = 'success';
    } else
    if (props.success===false) {
        contents = props.contents;
        clazz = 'failure';
    }
    return <div className={`ActionResult ${clazz}`}>{contents}</div>;
}

export function List(props) {
    if (props.items.length === 0) {
        return '';
    }
    const title = props.title ? <h2>{props.title}</h2> : '';
    return (
        <div className="List">
            {title}
            <div className="list-body">
                {props.items}
            </div>
        </div>
    );
}

export function Row(props) {
    if (!props.contents) {
        return '';
    }
    let title = !props.title ? '' : <label className="item-row-title">{props.title}:</label>;
    let contents = props.isWebcash ? webcashToCopiableValues(props.contents) : <CopiableValue contents={props.contents}/>;
    return (
        <div className="Row">
            {title}
            {contents}
        </div>
    );
}

export class CopiableValue extends React.Component {
    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this);
    }
    onClick(event) {
        navigator.clipboard
            .writeText(this.props.contents)
            .then( () => tooltip("Copied!") )
            .catch( (err) => console.error(`ERROR when trying to copy to clipboard: ${err}`) );
    }
    render() {
        return (
            <div className="CopiableValue" onClick={this.onClick}>
                {this.props.short ?? this.props.contents}
            </div>
        );
    }
}

function webcashToCopiableValues(val) {
    let values: array;
    if (Array.isArray(val)) {
        values = val;
    } else
    if (typeof val === 'string') {
        values = [val];
    } else {
        return '';
    }

    let key = 0;
    let copiableValues = values.map((x) => {
        const parts = x.split(':');
        const short = parts[0] + ':' + parts[1] + ':' + shorten(parts[2], 3);
        return <CopiableValue key={key++} contents={x} short={short}/>;
    });

    return <div className="copiable-panel">{copiableValues}</div>
}
