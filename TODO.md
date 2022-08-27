## New features

#### @mihailskkk: option to insert secrets in bulk. Like just copy-paste 10-15 secrets
#### @mihailskkk: option to export the wallet file in an encrypted format
#### Secret management: consolidate, check
#### "Forgot password?" -> Reset / Import
#### Password autolock
#### Prettier pop-ups instead of native
#### Replace send/receive form with closable success/error card

## Ideas

#### Initial walk-through
- ViewStart: Splash with "Get Started: create new / load from file / recover from master secret"

#### ViewHistory pagination, filter, search, sorting

#### Mobile 4 buttons (display:fixed)

#### Multi-wallet

#### Browser extension

#### Server-side
- Payment server: JS/Python/PHP plugin to receive and replace payments
- Backups, 2FA, notifications, ...

#### Payments
- Send (to [John|Jane|Mike]) via [QR|email|SMS|Twitter|Discord|API request]
    - https://developer.mozilla.org/en-US/docs/Web/API/Contact_Picker_API
- Payments/OTC/trading on Cosmos/Solana (Serum) (encrypt payload to receiver's public key). Address book.

#### Integrations
- Discord
- Twitter

#### ExternalSend
User flow:
- In 3rd party site, user clicks <a href="webcasa.app?send=1.23&memo=Invoice123&callback=3rd.com?pay_api">Pay 1.23 webcash</a>
- In WebCasa, "Create payment for W1.13?". User accepts.
- "Payment created". Shows QR.
- "How do you want to send it?"
    A) "Send payment to POST 3rd.com?pay_api"
    B) "Copy secret to clipboard"
    C) "Copy payment URL"

#### PinBoard: temporary text storage
- Abuse prevented with webcash fee
- How long to keep the pin around? Auto destroy after open/later?
- "Who can see this pin" everyone/private
- Private: User A creates bucket. User B sends webcash to bucket. User A claims.
