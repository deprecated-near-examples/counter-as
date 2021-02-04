Counter example in AssemblyScript
=================================

[![Open in Gitpod!](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/near-examples/counter)

<!-- MAGIC COMMENT: DO NOT DELETE! Everything above this line is hidden on NEAR Examples page -->

## Description

This contract implements simple counter backed by storage on blockchain.
Contract in `assembly/main.ts` provides methods to increment / decrement counter and get it's current value or reset.

Plus and minus buttons increase and decrease value correspondingly. When button L is toggled, counter will add or minus 10 a time. RS button is for reset. LE and RE buttons to let the robot wink to you.

## To Run
Open in the Gitpod link above or clone the repository.

```
git clone https://github.com/near-examples/counter
```


## Setup [Or skip to Login if in Gitpod](#login)
Install dependencies:

```
yarn
```

Make sure you have `near-cli` by running:

```
near --version
```

If you need to install `near-cli`:

```
npm install near-cli -g
```

## Login
If you do not have a NEAR account, please create one with [NEAR Wallet](https://wallet.nearprotocol.com).

In the project root, login with `near-cli` by following the instructions after this command:

```
near login
```

Modify the top of `src/config.js`, changing the `CONTRACT_NAME` to be the NEAR account name in the file `neardev/dev-account`. It starts with `dev-`.

```javascript
…
const CONTRACT_NAME = 'neardev/dev-account ACCOUNT ID'; /* TODO: fill this in! */
…
```

Start the example!

```
yarn start
```

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


