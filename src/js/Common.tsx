import { makeItemRow } from "./List";

export function ActionResult(props) {
    let contents = '';
    let clazz = '';
    if (props.success===true) {
        contents = makeItemRow(props.label, props.contents);
        clazz = 'success';
    } else
    if (props.success===false) {
        contents = props.contents;
        clazz = 'failure';
    }
    return <div className={`action-result ${clazz}`}>{contents}</div>;
}
