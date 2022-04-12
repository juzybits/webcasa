# Prod
	- Links to webcash.org, twitter, discord
	- <noscript> for SEO
    - Logo

# Navigation
	- ViewStart: Splash with "Get Started: create new / load from file / recover from master secret"
	- ViewSettings: "Delete" button
	- ViewAbout

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
	- QR payments
	- Browser extension
	- Send to [John/Jane/Mike] via [QR/email/SMS/Twitter/Discord/API request]
	- Payment server: PHP/Python/JS plugin to receive and replace payments
	- "Send with" email/crypto[Solana/Ethereum/etc]
	- Multi-wallet
	- Payments/OTC/trading on Cosmos/Solana (Serum) (encrypt payload to receiver's public key). Address book.
	- server-side or crypto-based: backups, 2FA, notifications, ...
