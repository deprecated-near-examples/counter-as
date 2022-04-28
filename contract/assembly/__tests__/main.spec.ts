import { get_num, reset, increment, decrement } from '../index';
import { context, storage } from 'near-sdk-as';

describe("Counter ", () => {
    it("should increment by one", () => {
        increment();
        expect(get_num()).toBe(1, "counter should be one after a single increment.");
    });

    it("get_num is the same as reading from storage", () => {
        expect(storage.getPrimitive<i8>("counter", 0)).toBe(get_num(), "storage.getPrimitive<i8>(\"counter\", 0) = get_num()");
    });

    it("should decrement by one", () => {
        increment();
        decrement();
        expect(get_num()).toBe(0, "counter should be zero after a single decrement.");
    });

    it("should be resettable", () => {
        increment();
        increment();
        reset(); // reset to zero
        expect(get_num()).toBe(0, "counter should be zero after it is reset.");
    });

    it("should increment multiple times and decrement back to zero", () => {
        increment();
        expect(get_num()).toBe(1, "increment failed");
        increment();
        expect(get_num()).toBe(2, "increment failed");
        decrement();
        expect(get_num()).toBe(1, "increment failed");
    });

    it("should not overflow", () => {
        storage.set<i8>("counter", 127)
        expect(() => {increment()}).toThrow();
    });

    it("should not underflow", () => {
        storage.set<i8>("counter", -128)
        expect(() => {decrement()}).toThrow();
    });
});