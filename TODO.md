# UX core
	- ViewTransfer: Send + Receive tabs. Make it default view.
	- ViewTerms: Splash screen with Webcash terms. Site-level accept from the user -> auto-accept in new wallets.

	- ViewSettings
		- .wallet-buttons
			+ "delete wallet" button (with safety guard if balance>0; e.g. prevent/warn/auto-download)
		- ViewWallet (.panel-info, .panel-depths)
		- ViewRecover (.panel-recover)
		- ViewCheck (.panel-check)

# UX extra
	- Send max amount
	- Log Search, pagination, sorting
	- Consistent logs:
		- The timestamp is sometimes missing
		- The JS wallet logs insert operations with type=insert, but the Python library logs them with type=receive

# UX cherry
	- Navbar: icons, left align
	- Clear history (all/selection)
	- Consolidate secrets (PAY total balance, then INSERT)
	- "Find in logs" next to secrets

# Prod
    - Logo
	- Links to webcash.org, twitter, discord
	- WebCasa Terms?

# State
	- store "casa" property in default_wallet.webcash
	- encrypt storage

# Server-side
	- backups, 2FA, notifications, payments, ...

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
