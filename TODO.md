# Security
    - Autolock: 15m

# Donate button
    - BTC, ERC-20
    - Webcash via lambda

# Bugs
    - Bug: Balance indicator repaint on Safari
    - Bug: Prevent logo area elements from collapsing

# UX
    - Add info throughout the site / ViewAbout
    - ViewStart: Splash with "Get Started: create new / load from file / recover from master secret"

    - Secret management: consolidate, check
    - ViewHistory pagination, filter, search, sorting

# Visual
    - Prettier pop-ups instead of native
    - Replace send form with "Success!" inline card
    - Multiple cards (e.g. for History)
    - Mobile 4 buttons (display:fixed)

# CORE: Review https://github.com/kanzure/webcash/pull/13/files

# Browser extension

# Multi-wallet

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
