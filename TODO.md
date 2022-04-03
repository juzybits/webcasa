# UX core
	- ViewTransfer: Send + Receive tabs. Make it default view.
	- ViewSecrets: use tabbed card

	- ViewTerms: Splash screen with Webcash terms. Site-level accept from the user -> auto-accept in new wallets.

	- ViewSettings
		- .wallet-buttons
			+ "delete wallet" button (with safety guard if balance>0; e.g. prevent/warn/auto-download)
		- ViewWallet (.panel-info, .panel-depths)
		- ViewRecover (.panel-recover)
		- ViewCheck (.panel-check)

# UX extra
	- Send max amount
	- Auto-copy PAY new secret
	- Preserve Send/Receive .state.lastOuput
	- ViewHistory filter, search, pagination, sorting
		- [CORE] Consistent logs:
			- The timestamp is sometimes missing
			- The JS wallet logs insert operations with type=insert, but the Python library logs them with type=receive

# UX cherry
	- Navbar: icons, left align
	- Clear history (all/selection)
	- Consolidate secrets (PAY total balance, then INSERT)
	- "Find in logs" next to secrets
	- Mobile 4 buttons (display:fixed)

# State
	- encrypt local storage with pin/MS
		- keep encrypted at all times - only decrypted in memory
	- autolock
	- wallet.casa + option to download underlying default_wallet.webcash
		{version, wallets, config, payments, contacts, etc}
	- (store "casa" property in default_wallet.webcash)

# Skunkworks
	- Multi-wallet
	- Browser extension
	- QR codes
	- Payments/OTC/trading on Cosmos/Solana (Serum) (encrypt payload to receiver's public key)
	- Address book
	- server-side or crypto-based: backups, 2FA, notifications, ...

# Prod
    - Logo
	- Links to webcash.org, twitter, discord
	- WebCasa Terms?

# 1:1 UI for commands and wallet state

## COMMANDS
status/info (done)
load/create/download wallet (done)
pay (done)
insert (done)
insertmany TODO
terms TODO
check TODO
recover TODO

## STATE
logs (done)
webcash (done)
unconfirmed (done)
