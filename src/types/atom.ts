//-Path: "react-atom/src/types/atom.ts"

export type AtomPayloadsType = { [K in string]: any };

export type AtomType<Value, Payloads extends AtomPayloadsType> = {
    get: () => Value;
    set: () => (value: React.SetStateAction<Value>) => void;
    use: () => [Value, React.Dispatch<React.SetStateAction<Value>>];
    reset: () => () => void;
    ref: () => (element: HTMLElement | null) => void;
    useRef: () => [Value, (element: HTMLElement | null) => void];
    actions: () => AtomUseActionsType<Payloads>;
};

// Types for handling actions
export type AtomUseActionType<Payload> = (payload: Payload) => void;
export type AtomUseActionsType<Payloads extends AtomPayloadsType> = {
    [K in keyof Payloads]: AtomUseActionType<Payloads[K]>;
};

export type AtomActionsType<Value, Payloads extends AtomPayloadsType> = {
    [K in keyof Payloads]: AtomActionType<Value, Payloads[K]>;
};
export type AtomActionType<Value, Payload> = (
    state: Value,
    payload: Payload,
) => Value;

// Configuration options type
export type AtomOptionType<Value, Payloads extends AtomPayloadsType> = {
    save?: string;
    actions?: AtomActionsType<Value, Payloads>;
};
