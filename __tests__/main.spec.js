const Runtime = require("near-sdk-as/vm").Runtime;
const path = require("path");
const runtime = new Runtime();


test("Counter", () => {
  const alice = runtime.newAccount("alice");
  const counter = runtime.newAccount("counter", path.join(__dirname,"../out/main.wasm"));
  expect(alice.call_other("counter", "incrementCounter", {value: 1}).result.outcome.logs[0]).toBe("Counter is now: 1");
  expect(counter.call("getCounter").return_data).toBe(1, "counter should increment");
})
