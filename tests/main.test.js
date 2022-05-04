describe('Token', function () {
  let near;
  let contract;
  let accountId;

  jest.setTimeout(20000);

  beforeAll(async function () {
    near = await nearlib.connect(nearConfig);
    accountId = nearConfig.contractName;
    contract = await near.loadContract(nearConfig.contractName, {
      viewMethods: ['get_num'],
      changeMethods: ['increment', 'decrement', 'reset'],
      sender: accountId
    });
  });

  describe('counter', function () {
    it('can be incremented', async function () {
      const startCounter = await contract.get_num({args:{}});
      await contract.increment({args:{}});
      const endCounter = await contract.get_num({args:{}});
      expect(endCounter).toEqual(startCounter + 1);
    });
    it('can be decremented', async function () {
      await contract.increment({args:{}});
      const startCounter = await contract.get_num({args:{}});
      await contract.decrement({args:{}});
      const endCounter = await contract.get_num({args:{}});
      expect(endCounter).toEqual(startCounter - 1);
    });
    it('can be reset', async function () {
      await contract.increment({args:{}});
      await contract.reset({args:{}});
      const endCounter = await contract.get_num({args:{}});
      expect(endCounter).toEqual(0);
    });
  });
});