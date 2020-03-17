import {
    getCounter,
    resetCounter,
    incrementCounter,
    decrementCounter
} from '../main';

import { context, storage, VM } from 'near-sdk-as';

describe("Counter ", () => {
    it("should increment by one", () => {
        incrementCounter(1);
        expect(getCounter()).toBe(1, "counter should be one after a single increment.");
    });

    it("getCounter is the same as reading from storage", () => {
        expect(storage.getPrimitive<i32>("counter", 0)).toBe(getCounter(), "storage.getPrimitive<i32>(\"counter\", 0) = getCounter()");
    });

    it("should decrement by one", () => {
        decrementCounter(1);
        expect(getCounter()).toBe(0, "counter should be zero after a single decrement.");
    });

    it("should be resetable", () => {
        incrementCounter(1);
        incrementCounter(1);
        resetCounter(); // reset to zero
        expect(getCounter()).toBe(0, "counter should be zero after it is reset."); 
    });
    
    it("should increment multiple times and decrement back to zero", () => {
        incrementCounter(1);
        expect(getCounter()).toBe(1, "0 + 1 = 1");
        incrementCounter(3);
        expect(getCounter()).toBe(4, "1 + 3 = 4");
        decrementCounter(4);
        expect(getCounter()).toBe(0, "4 - 4 = 0");
    });

    describe("With reset state", () => {
        // Save the state before all tests
        beforeAll(() => {
            VM.saveState();
        });

        // Restore the state after each test
        afterEach(() => {
            VM.restoreState();
        });

        it("should increment by one and restore VM state after", () => {
            incrementCounter(1);
            expect(getCounter()).toBe(1, "0 + 1 = 1");
        });
    
        it("should decrement by one and start at zero", () => {
            expect(getCounter()).toBe(0, "the state should be restored.")
            decrementCounter(1)
            expect(getCounter()).not.toBe(0, "0 - 1 != 0");
            expect(getCounter()).toBe(-1, "0 - 1 = -1");
        });
    });

    it("should be eve's account", () => {
        expect(context.contractName).toBe("eve");
    });
});


