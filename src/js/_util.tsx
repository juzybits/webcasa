// Given a WebcashWallet, format and return its master secret
export function formatMasterSecret(wallet: WebcashWallet) {
	var secret = wallet.getContents().master_secret;
    var start = secret.slice(0, 4);
    var end = secret.slice(-4);
    return `${start}...${end}`;
}

export function formatTimestamp(ts: string) {
    if (!ts) {
        return '';
    }
    return ts.slice(0, -10);
}

export function randomId(prefix: string) {
    prefix = prefix ? prefix+"-" : '';
    return prefix + Math.random().toString(36).replace(/[^a-z]+/g, 'x').substring(6);
}
