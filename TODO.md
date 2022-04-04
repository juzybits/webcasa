# UX core
	- ViewSettings
		- CHECK
		- RECOVER
		- "Delete" button (with safety guard if balance>0; e.g. prevent/warn/auto-download)
	- ViewTerms
		Splash screen with Webcash terms.
		Site-level accept from the user -> auto-accept in new wallets.
	- ViewStart
		"Get Started"
			- Create new wallet
			- Load wallet from file
			- Recover wallet from master secret

# UX extra
	- Send max amount
	- <hr> in nav
	- Preserve Send/Receive last output within session
	- Render Transfers history in separate .card
	- Keep active menu item highlighted
	- ViewHistory pagination

# CORE: Consistent logs:
		- The timestamp is sometimes missing
		- The JS wallet logs insert operations with type=insert, but the Python library logs them with type=receive

# UX cherry
	- Auto-copy PAY new secret (with checkbox maybe)
	- Navbar: icons, left align
	- Clear history (all/selection)
	- Consolidate secrets (PAY total balance, then INSERT)
	- "Find in logs" next to secrets
	- Mobile 4 buttons (display:fixed)
	- ViewHistory filter, search, sorting

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
	- QR code-based payments
	- Payments/OTC/trading on Cosmos/Solana (Serum) (encrypt payload to receiver's public key)
	- Address book
	- server-side or crypto-based: backups, 2FA, notifications, ...

# Prod
    - Logo
	- Links to webcash.org, twitter, discord
	- WebCasa Terms?
	- <noscript> for SEO

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
