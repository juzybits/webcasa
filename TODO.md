# UX easy
    - BUG: Balance indicator repaint
    - Prevent logo area elements from collapsing

# Security
    - Encrypt local storage with password
    - Keep encrypted at all times. Only decrypted in memory.
    - Autolock

# UX medium
    - Add info throughout the site / ViewAbout
    - Prettier pop-ups instead of native
    - Replace send form with "Success!" card
    - ViewStart: Splash with "Get Started: create new / load from file / recover from master secret"

# UX hard
    - Multi-wallet
    - ViewHistory pagination, filter, search, sorting
    - Mobile 4 buttons (display:fixed)
    - Multiple cards (e.g. for History)

# CORE: Review https://github.com/kanzure/webcash/pull/13/files

# Browser extension

# Server-side
    - Payment server: JS/Python/PHP plugin to receive and replace payments
    - Backups, 2FA, notifications, ...

# Payments
    - Send (to [John|Jane|Mike]) via [QR|email|SMS|Twitter|Discord|API request]
    - Payments/OTC/trading on Cosmos/Solana (Serum) (encrypt payload to receiver's public key). Address book.

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
