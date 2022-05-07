# Security
    - Locked/unlocked on nav button
    - Settings > Password
        - Set/update password
        - Autolock: 15m

# Donate button
    - BTC, ERC-20
    - Webcash via lambda

# miranda's feedback
- some more feedback on wallet, right now if you import a file, it doesn't rescan automatically.. might be good to make this auto
- when re-import and scanning, secrets don't update unless you click around
- under settings you sometimes have only EXPORT in green or when you export, you get the import/export/reset... not sure if this is a bug or feature... but maybe having all 3 buttons all the time... with the expected action, i.e. EXPORT show in green to guide user...

# saunter's feedback
- would be nice to add commas to amounts in the wallet (119,417,000 instead of 119417000)

# Bugs
    - Bug: Balance indicator repaint on Safari
    - Bug: Prevent logo area elements from collapsing

# UX
    - ExternalReceive: do not insert until terms accepted?, auto check secret?

    - Add info throughout the site / ViewAbout
    - ViewStart: Splash with "Get Started: create new / load from file / recover from master secret"

    - Secret management: consolidate, check
    - ViewHistory pagination, filter, search, sorting

# Visual
    - Prettier pop-ups instead of native
    - Replace send form with "Success!" inline card
    - Multiple cards (e.g. for History)
    - Mobile 4 buttons (display:fixed)

# Tools
Kanzure: "In this context, there is an sqlite wallet database left over from webminer. The user wants a script to export each secret from the wallet, and then directly insert all values (without using the insert function) into a default_wallet.webcash for the python wallet. Then, make a payment to yourself in the full balance to merge all secrets together, and/or run the recover or check functions.... I think."

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
