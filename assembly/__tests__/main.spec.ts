import {
    getCounter,
    resetCounter
} from '../main';

describe("smart contract",() => {
    // getCounter(): i32 {
    it("should respond to getCounter", () => {
        expect(getCounter()).toStrictEqual(0)
        // expect(getCounter()).toBeNull(); // uncomment this line to see the SPECIFIC compilation error
    })
    // resetCounter(): void {
    it("should respond to resetCounter", () => {
        // expect(resetCounter()).toBeNull(); // uncomment this line to see the VAGUE compilation error
    })
})


