import {
    getCounter,
    resetCounter,
    incrementCounter,
    decrementCounter
} from '../main';

import { VM } from "wasm-mock-vm";

describe("Counter ", () => {
    it("should increment by one", () => {
        incrementCounter(1);
        expect(getCounter()).toBe(1);
    });

    it("should decrement by one", () => {
        decrementCounter(1);
        expect(getCounter()).toBe(0);
    });

    it("should be resetable", () => {
        incrementCounter(1);
        incrementCounter(1);
        resetCounter(); // reset to zero
        expect(getCounter()).toBe(0); 
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
            expect(getCounter()).toBe(1);
        });
    
        it("should decrement by one and start at zero", () => {
            decrementCounter(1)
            expect(getCounter()).not.toBe(0);
            expect(getCounter()).toBe(-1);
        });
    })
});


