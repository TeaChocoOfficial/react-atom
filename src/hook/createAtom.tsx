//-Path: "react-atom/src/hook/createAtom.tsx"
import {
    AtomType,
    AtomOptionType,
    AtomActionsType,
    AtomPayloadsType,
    AtomUseActionsType,
} from "../types/atom";
import { atom, useAtom } from "jotai";
import { getStorage, setStorage } from "../function/storage";
import { useMemo } from "react";

export default function createAtom<
    Value,
    Payloads extends AtomPayloadsType = AtomPayloadsType,
    AtomOption extends AtomOptionType<Value, Payloads> = AtomOptionType<
        Value,
        Payloads
    >,
>(defaultValue: Value, option?: AtomOption): AtomType<Value, Payloads> {
    const save = option?.save;
    const valueSave = save !== undefined ? getStorage<Value>(save) : undefined;
    const atomValue = atom<Value>(valueSave ? valueSave : defaultValue);

    const saveing = (value: React.SetStateAction<Value>, state: Value) => {
        if (save !== undefined) {
            if (typeof value === "function") {
                const newValue = (value as (prevState: Value) => Value)(state);
                setStorage(save, newValue);
            } else {
                setStorage(save, value);
            }
        }
    };

    const get = (): Value => {
        const [state] = useAtom(atomValue);
        return useMemo(() => state, [state]);
    };

    const set = (): React.Dispatch<React.SetStateAction<Value>> => {
        const [state, setState] = useAtom(atomValue);
        return (value) => {
            saveing(value, state);
            setState(value);
        };
    };

    const use = (): [Value, React.Dispatch<React.SetStateAction<Value>>] => {
        const state = useAtom(atomValue);
        return useMemo(() => state, [state]);
    };

    const reset = () => {
        const [, setState] = useAtom(atomValue);
        return () => {
            saveing(defaultValue, defaultValue);
            setState(defaultValue);
        };
    };

    const ref = () => {
        const [, setState] = useAtom(atomValue);
        return (element: HTMLElement | null) => setState(element as Value);
    };

    const useRef = (): [Value, (element: HTMLElement | null) => void] => {
        const [state, setState] = useAtom(atomValue);
        const setRef = (element: HTMLElement | null) =>
            setState(element as Value);
        return [state, setRef];
    };
    const actions = () => {
        const [state, setState] = useAtom(atomValue);

        return useMemo(() => {
            const definedActions = {} as AtomUseActionsType<Payloads>;

            const actionMap =
                option?.actions ?? ({} as AtomActionsType<Value, Payloads>);

            Object.entries(actionMap).forEach(([key, action]) => {
                if (action) {
                    definedActions[key as keyof Payloads] = (
                        payload: Payloads[keyof Payloads],
                    ) => {
                        const newState = action(state, payload);
                        saveing(newState, state);
                        setState(newState);
                    };
                }
            });
            return definedActions;
        }, [state]);
    };

    return { get, set, use, reset, ref, useRef, actions };
}
