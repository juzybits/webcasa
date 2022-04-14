# Build up
    - QR codes:
        PAY
            - ViewSend: "Copy to clipboard", "Generate QR code"
            - links to https://webcasa.app#insert=e....
        INSERT
            - App.render()  if(this.state.is1stRender) ...
            - if no wallet: "You received X webcash. Copy to clipboard / Insert in [new] wallet [+ accept terms])"
                - Normalize styles with .card .modal .closable
            - then: render "Receive"

    - P2P payments via email and SMS (prefill)
    - Browser extension

# Prod
    - Logo
    - Add info throughout the site / ViewAbout
    - ViewStart: Splash with "Get Started: create new / load from file / recover from master secret"
    - Server-side logging (needs billing account)

# CORE: Consistent logs (PR sent)
# CORE: Decimal bug (PR sent)

# UX
    - "X" better icon
    - Prevent logo area elements from collapsing
    - Favicon align vertically

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
