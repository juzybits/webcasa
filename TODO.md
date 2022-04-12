# Prod
    - Version indicator
    - Logo
    - Links to twitter, discord
    - Server-side logging (needs billing account)

# UX
    - Add info throughout the site
    - ViewAbout
    - ViewStart: Splash with "Get Started: create new / load from file / recover from master secret"
    - ViewSettings: "Delete" button

# Build up
    - .zip download
    - QR payments
    - P2P payments via email and SMS (prefill)
    - Browser extension

# CORE: Consistent logs (PR sent)
# CORE: Decimal bug (PR sent)

# UX cherry
    - Prettier pop-ups instead of native
    - ViewHistory pagination, filter, search, sorting
    - Mobile 4 buttons (display:fixed)
    - Multiple cards (e.g. for History)

# Server-side
    - Payment server: JS/Python/PHP plugin to receive and replace payments
    - Backups, 2FA, notifications, ...

# Payments
    - Send (to [John|Jane|Mike]) via [QR|email|SMS|Twitter|Discord|API request]
    - Payments/OTC/trading on Cosmos/Solana (Serum) (encrypt payload to receiver's public key). Address book.

# Security
    - Encrypt local storage with password
    - Keep encrypted at all times. Only decrypted in memory.
    - Autolock

# Integrations
    - Discord
    - Twitter

# Code quality
    - Review wallet saving.
    - Unit tests.

# "PinBoard: temporary text storage".
    - Abuse prevented with webcash fee
    - How long to keep the pin around? Auto destroy after open/later?
    - "Who can see this pin" everyone/private
    - Private: User A creates bucket. User B sends webcash to bucket. User A claims.
