import { storage, logging } from "near-sdk-as";

export function get_num(): i8 {
  return storage.getPrimitive<i8>("counter", 0);
}

// Public method - Increment the counter
export function increment(): void {
  safeguard_overflow()
  const new_value = get_num() + 1;
  storage.set<i8>("counter", new_value);
  logging.log("Increased number to " +  new_value.toString());
}

// Public method - Decrement the counter
export function decrement(): void {
  safeguard_underflow()
  const new_value = get_num() - 1;
  storage.set<i8>("counter", new_value);
  logging.log("Decreased number to " + new_value.toString());
}

// Public method - Reset to zero
export function reset(): void {
  storage.set<i8>("counter", 0);
  logging.log("Reset counter to zero");
}

function safeguard_overflow(): void{
  const value = get_num()
  assert(value < 127, "Counter is at maximum")
}

function safeguard_underflow(): void{
  const value = get_num()
  assert(value > -127, "Counter is at minimum")
}