const { Runtime } = require("near-sdk-as/runtime");
const path = require("path");

const contractPath = path.join(__dirname,"../out/main.wasm");

describe('Token', function () {
  let runtime;
  let contract;

  function getCounter() {
    return contract.view("getCounter").return_data;
  }

  beforeAll(function () {
    runtime = new Runtime();
    contract = runtime.newAccount("counter", contractPath);
  });

  describe('counter', function () {
    it('can be incremented', function () {
      const startCounter = getCounter() 
      expect(startCounter).toEqual(0);
      contract.call("incrementCounter",{value: 1});
      const endCounter = getCounter()
      const _endCounter = contract.state["counter"];
      expect(endCounter).toEqual(startCounter + 1);
      expect(_endCounter).toEqual(endCounter);
    });

    it('can be decremented', function () {
      const startCounter = getCounter()
      contract.call("decrementCounter",{value: 1});
      const endCounter = getCounter()
      expect(endCounter).toEqual(startCounter - 1);
    });
  });
});