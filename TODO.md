# UX
	- Prevent user from leaving page with unsaved changes
	- New Upload/Create view for new users
	- Improve ViewWallet (maybe panels)
	- Pretty font
	- Navbar icons
	- "Copy" button next to various items
	- T&C (ask for advice)

# State management ideas
	- store "_casa" property in default_wallet.webcash
	- "unsaved changes" UI indicator
	- preserve [encrypted] state across sessions in local storage / cookies
	- server-side encrypted backups
	- server-side 2FA

# 1:1 UI for commands and wallet state

## COMMANDS
status/info (done)
load/create/download wallet (done)
pay (done, missing history)
insert (done, missing history)
terms
insertmany
check
recover

## STATE
logs (done)
webcash (done)
unconfirmed (done)
