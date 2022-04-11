# State
	- Save & load App.state into local storage "casa" (except [wallet])

# Prod
	- Links to webcash.org, twitter, discord
	- <noscript> for SEO
    - Logo

# Navigation
	- ViewStart: Splash with "Get Started: create new / load from file / recover from master secret"
	- ViewSettings: Delete

# Code quality
	- Review wallet saving.
	- Unit tests.

# CORE: Consistent logs (PR sent)
# CORE: Decimal bug (PR sent)

# UX cherry
	- ViewHistory pagination, filter, search, sorting
	- Mobile 4 buttons (display:fixed)
	- Multiple cards (e.g. for History)

# Security
	- encrypt local storage with pin/MS
		- keep encrypted at all times - only decrypted in memory
	- autolock

# Skunkworks
	- Browser extension
	- Merchant plugin
	- "Send with" email/crypto[Solana/Ethereum/etc]
	- Multi-wallet
	- QR code-based payments
	- Payments/OTC/trading on Cosmos/Solana (Serum) (encrypt payload to receiver's public key). Address book.
	- server-side or crypto-based: backups, 2FA, notifications, ...
