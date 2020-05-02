const Runtime = require("near-sdk-as/runtime").Runtime;
const path = require("path");


const contractPath = path.join(__dirname,"../out/main.wasm");

describe('Token', function () {
  let runtime;
  let contract;

  function getCounter() {
    return parseInt(contract.view("getCounter").return_data);
  }

  beforeAll(function () {
    runtime = new Runtime();
    contract = runtime.newAccount("counter", contractPath);
  });

  describe('counter', function () {
    it('can be incremented', function () {
      const startCounter = getCounter() 
      contract.call("incrementCounter",{value: 1});
      const endCounter = getCounter()
      expect(endCounter).toEqual(startCounter + 1);
    });
    it('can be decremented', async function () {
      contract.call("incrementCounter",{value: 1});
      const startCounter = getCounter()
      contract.call("decrementCounter",{value: 1});
      const endCounter = getCounter()
      expect(endCounter).toEqual(startCounter - 1);
    });
  });
});