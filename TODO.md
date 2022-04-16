# QR codes
    - Show "copy URL" under QR
    - Replace send form with "Success!" card

# CORE: Decimal bug (PRs sent)
    - Remove trailing 0s, update PR
# CORE: Review https://github.com/kanzure/webcash/pull/18/files
# CORE: Review https://github.com/kanzure/webcash/pull/13/files

# UX easy
    - "X" better icon
    - Prevent logo area elements from collapsing
    - Balance indicator repaint bug
    - Favicon align vertically

# Security
    - Encrypt local storage with password
    - Keep encrypted at all times. Only decrypted in memory.
    - Autolock

# Prod
    - Logo
    - Add info throughout the site / ViewAbout
    - ViewStart: Splash with "Get Started: create new / load from file / recover from master secret"
    - Server-side logging (needs billing account)

# UX hard
    - Prettier pop-ups instead of native
    - ViewHistory pagination, filter, search, sorting
    - Mobile 4 buttons (display:fixed)
    - Multiple cards (e.g. for History)

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
