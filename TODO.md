# Feedback
    - kanzure:  Could I request a more prominent link to the webcash site in the webcasa app?
                like a "Learn about webcash here:" ... some users are receiving webcash for the
                first time into a webcasa wallet, and it's not really clear where to go to learn
                more about it. I see you have a W button in the menu but perhaps something else?

    - kanzure:  When the user starts typing in the input box for sending,
                I think it should clear the last sent one from the screen,
                until the user hits send, and then the new one should display.

    - mihailskkk: option to export the wallet file in an encrypted format

    - mihailskkk: option to insert secrets in bulk. Like just copy-paste 10-15 secrets

# Password
    - "Forgot password?" -> Reset / Import
    - Autolock: 15m

# Donate button
    - BTC, ERC-20
    - Webcash via lambda

# ExternalSend
    Flow:
        - In 3rd party site, user clicks <a href="webcasa.app?send=1.23&memo=Invoice123&callback=3rd.com?pay_api">Pay 1.23 webcash</a>
        - In WebCasa, "Create payment for W1.13?". User accepts.
        - "Payment created". Shows QR.
        - "How do you want to send it?"
            A) "Send payment to POST 3rd.com?pay_api"
            B) "Copy secret to clipboard"
            C) "Copy payment URL"

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
