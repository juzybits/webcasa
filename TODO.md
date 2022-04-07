# Navigation
	- ViewSettings
		- CHECK
		- RECOVER
		- "Delete" button (with safety guard if balance>0; e.g. prevent/warn/auto-download)
	- ViewTerms
		Splash screen with Webcash terms.
		Site-level accept from the user -> auto-accept in new wallets.
	- ViewStart: Splash with "Get Started: create new / load from file / recover from master secret"

# Code quality
	- handleModifyWallet() - bubble up logic to App via this.props.command('wallet.insert', {webcash: ..., memo: ...}), etc
	- review wallet saving. test.

# UX
	- Keep active menu item highlighted
	- Preserve Send/Receive last output within session

# CORE: Consistent logs (PR sent)
# CORE: Decimal bug (PR sent)

# Prod
	- Domain with TLS
	- Links to webcash.org, twitter, discord
    - Logo
	- <noscript> for SEO
	- WebCasa Terms?

# UX cherry
	- URL paths, history (React Router)
	- ViewHistory pagination, filter, search, sorting
	- Mobile 4 buttons (display:fixed)
	- Multiple cards (e.g. for History)

# Security
	- encrypt local storage with pin/MS
		- keep encrypted at all times - only decrypted in memory
	- autolock
	- wallet.casa + option to download underlying default_wallet.webcash
		{version, wallets, config, payments, contacts, etc}
	- (or: store "casa" property in default_wallet.webcash)

# Skunkworks
	- Browser extension
	- Merchant plugin
	- "Send with" email/crypto[Solana/Ethereum/etc]
	- Multi-wallet
	- QR code-based payments
	- Payments/OTC/trading on Cosmos/Solana (Serum) (encrypt payload to receiver's public key). Address book.
	- server-side or crypto-based: backups, 2FA, notifications, ...

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
