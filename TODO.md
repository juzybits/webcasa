# Replace send form with "Success!" inline card
- @kanzure: When the user starts typing in the input box for sending,
           I think it should clear the last sent one from the screen,
           until the user hits send, and then the new one should display.

# Donate button
    - BTC, ERC-20
    - Webcash via lambda

- @mihailskkk: option to insert secrets in bulk. Like just copy-paste 10-15 secrets
- Secret management: consolidate, check

- @mihailskkk: option to export the wallet file in an encrypted format
- "Forgot password?" -> Reset / Import
- Autolock: 15m

- Prettier pop-ups instead of native

- Bug: Balance indicator repaint on Safari

##### IDEAS

# Initial walk-through
    - ViewStart: Splash with "Get Started: create new / load from file / recover from master secret"

# ViewHistory pagination, filter, search, sorting

# Mobile 4 buttons (display:fixed)

# Multi-wallet

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

# ExternalSend
    Flow:
        - In 3rd party site, user clicks <a href="webcasa.app?send=1.23&memo=Invoice123&callback=3rd.com?pay_api">Pay 1.23 webcash</a>
        - In WebCasa, "Create payment for W1.13?". User accepts.
        - "Payment created". Shows QR.
        - "How do you want to send it?"
            A) "Send payment to POST 3rd.com?pay_api"
            B) "Copy secret to clipboard"
            C) "Copy payment URL"

# "PinBoard: temporary text storage".
    - Abuse prevented with webcash fee
    - How long to keep the pin around? Auto destroy after open/later?
    - "Who can see this pin" everyone/private
    - Private: User A creates bucket. User B sends webcash to bucket. User A claims.
