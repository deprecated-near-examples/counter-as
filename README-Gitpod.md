Counter example in AssemblyScript - Gitpod version
==================================================

This README is specific to Gitpod and this example. For local development, please see [README.md](README.md).

## Description

In Gitpod, the counter will start automatically. Please look in the terminal for a link to follow.

This contract implements simple counter backed by storage on blockchain.
Contract in `assembly/main.ts` provides methods to increment / decrement counter and get it's current value or reset.

Plus and minus buttons increase and decrease value correspondingly. When button L is toggled, counter will add or minus 10 a time. RS button is for reset. LE and RE buttons to let the robot wink to you.

## To Test

```
yarn asp  # as-pect tests
NODE_ENV=ci yarn jest # jest tests
NODE_ENV=ci yarn test # both
```

## To Explore

- `assembly/main.ts` for the contract code
- `src/index.html` for the front-end HTML
- `src/main.js` for the JavaScript front-end code and how to integrate contracts
- `src/test.js` for the JS tests for the contract


## Data collection

By using Gitpod in this project, you agree to opt-in to basic, anonymous analytics. No personal information is transmitted. Instead, these usage statistics aid in discovering potential bugs and user flow information.
