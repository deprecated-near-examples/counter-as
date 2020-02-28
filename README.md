# Counter example in AssemblyScript
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/nearprotocol/counter)

## Description

This contract implements simple counter backed by storage on blockchain.
Contract in `assembly/main.ts` provides methods to increment / decrement counter and get it's current value or reset.

Plus and minus buttons increase and decrease value correspondingly. When button L is toggled, counter will add or minus 10 a time. RS button is for reset. LE and RE buttons to let the robot wink to you.

## To Run
```
yarn start
```

## To Test

```
yarn test
```

## To Explore

- `assembly/main.ts` for the contract code
- `src/index.html` for the front-end HTML
- `src/main.js` for the JavaScript front-end code and how to integrate contracts
- `src/test.js` for the JS tests for the contract


