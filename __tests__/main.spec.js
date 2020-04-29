const Runtime = require("near-sdk-as/vm/dist").Runtime;
const path = require("path");



// test("Counter", () => {
//   const alice = runtime.newAccount("alice");
//   const counter = runtime.newAccount("counter", );
//   expect(alice.call_other("counter", "incrementCounter", {value: 1}).result.outcome.logs[0]).toBe("Counter is now: 1");
//   expect(counter.call("getCounter").return_data).toBe(1, "counter should increment");
// });

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