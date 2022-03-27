// Given a WebcashWallet, format and return its master secret
export function formatMasterSecret(wallet) {
	var secret = wallet.getContents().master_secret;
    var start = secret.slice(0, 4);
    var end = secret.slice(-4);
    return `${start}...${end}`;
}
