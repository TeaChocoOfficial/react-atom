<!---Path: "react-atom/readme.md" -->
# CreateAtom Hook Documentation

The `createAtom` function is a utility for managing state using Jotai. It provides advanced features like persistent storage and custom actions to modify state.

## Features
- Persistent state storage.
- State getter and setter methods.
- Hooks for using state and resetting it.
- DOM element reference handling.
- Custom actions with payloads.

---

## Usage

### Importing
```typescript
import { createAtom } from "@teachoco-official/react-atom";
```

### Creating an simple Atom
The `initialValue` parameter is the default value for the state.

```typescript
const myAtom = createAtom(initialValue);
```

### Accessing Atom Functions
The `createAtom` function returns an object with the following methods:

#### 1. `get()`
Gets the current state value.

```typescript
const value = myAtom.get();
```

#### 2. `set()`
Returns a function to set the state value.

```typescript
const setState = myAtom.set();
setState(newValue);
```

#### 3. `use()`
Returns the current state and a dispatcher for setting it.

```typescript
const [state, setState] = myAtom.use();
```

#### 4. `reset()`
Returns a function to reset the state to its initial value.

```typescript
const resetState = myAtom.reset();
resetState();
```

#### 5. `ref()`
Returns a function to set a DOM element reference as the state value.

```typescript
export function Component() {
    const buttonRef = buttonAtom.ref();

    return <button ref={buttonRef}>some button</button>;
}
```

#### 6. `useRef()`
Returns the current state and a function to set a DOM element reference.

```typescript
export function Component() {
    const [ref, setRef] = buttonAtom.useRef();

    useEffect(() => {
        if (ref) {
            ref.textContent = "transform button";
        }
    }, [ref]);

    return <button ref={setRef}>some button</button>;
}
```

#### 7. `actions()`
Returns the defined actions with payloads.

```typescript
console.log(myAtom.get()); // state value is 0
const { increment, decrement } = myAtom.actions();
increment(5); // Adds 5 to the state
decrement(3); // Subtracts 3 from the state
console.log(myAtom.get()); // state value is 2
```

---

### Creating an Atom with Save
Reload web page to see saved state.

```typescript
const saveAtom = createAtom(initialValue, {
  save: "my atom store",
});
```

#### Parameters
1. `initialValue`: The default value for the state.
2. `option` (optional): Configuration options for the atom:
   - `save` (string): Key for persisting state in local storage.

### Creating an Atom with Actions
```typescript
const myAtom = createAtom(initialValue, {
  actions: {
    increment: (state, payload: number) => state + payload,
    decrement: (state, payload: number) => state - payload,
  },
});
```

#### Parameters
1. `initialValue`: The default value for the state.
2. `option` (optional): Configuration options for the atom:
   - `actions` (object): Custom actions to modify the state.

## Example

### Counter Example
```typescript
interface CounterAtomPayloads {
    increment: number;
    decrement: number;
}

const counterAtom = createAtom<number, CounterAtomPayloads>(0, {
    save: "counterKey",
    actions: {
        increment: (state, payload) => state + payload,
        decrement: (state, payload) => state - payload,
    },
});

function CounterComponent() {
    const [count, setCount] = counterAtom.use();
    const { increment, decrement } = counterAtom.actions();

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => increment(1)}>Increment</button>
            <button onClick={() => decrement(1)}>Decrement</button>
            <button onClick={counterAtom.reset()}>Reset</button>
        </div>
    );
}
```

---

## Advanced Configuration

### Custom Actions with Payloads
You can define custom actions with specific payloads.

```typescript
const myAtom = createAtom<string, { appendText: string; clear: void }>(
    "",
    {
        actions: {
            appendText: (state, payload: string) => state + payload,
            clear: () => "",
        },
    },
);

export function Component() {
    const { appendText, clear } = myAtom.actions();
    appendText("Hello"); // Appends "Hello" to the state
    clear(); // Resets the state to an empty string
}

```

### Persistent State
To persist state, provide a `save` key:

```typescript
const persistentAtom = createAtom(0, {
    save: "persistentKey",
});
```

