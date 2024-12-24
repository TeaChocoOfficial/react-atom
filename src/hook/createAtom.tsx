//-Path: "react-atom/src/hook/createAtom.tsx"
import {
    AtomType,
    AtomOptionType,
    AtomActionsType,
    AtomPayloadsType,
    AtomUseActionsType,
} from "../types/atom";
import { atom, useAtom } from "jotai";
import { useCallback, useMemo } from "react";
import { getStorage, setStorage } from "../function/storage";

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

    const saving = (value: React.SetStateAction<Value>, state: Value) => {
        if (save !== undefined) {
            if (typeof value === "function") {
                const newValue = (value as (prevState: Value) => Value)(state);
                setStorage(save, newValue); // อัปเดต storage
            } else {
                setStorage(save, value);
            }
        }
    };

    function getSetState(
        value: React.SetStateAction<Value>,
        setState: React.Dispatch<React.SetStateAction<Value>>,
    ) {
        setState((prev) => {
            saving(value, prev);
            if (typeof value === "function") {
                const newValue = (value as (prevState: Value) => Value)(prev);
                return newValue;
            }
            return value;
        });
    }

    const get = (): Value => {
        const [state] = useAtom(atomValue);
        return useMemo(() => state, [state]);
    };

    const set = (): React.Dispatch<React.SetStateAction<Value>> => {
        const [, setState] = useAtom(atomValue);
        return useCallback((value) => getSetState(value, setState), []);
    };

    const use = (): [Value, React.Dispatch<React.SetStateAction<Value>>] => {
        const [state, setState] = useAtom(atomValue);
        const setValue = useCallback(
            (value: React.SetStateAction<Value>) =>
                getSetState(value, setState),
            [],
        );
        return useMemo(() => [state, setValue], [state, setValue]);
    };

    const reset = () => {
        const [, setState] = useAtom(atomValue);
        return useCallback(() => {
            saving(defaultValue, defaultValue);
            setState(defaultValue);
        }, [setState]);
    };

    const ref = () => {
        const [, setState] = useAtom(atomValue);
        return useCallback(
            (element: HTMLElement | null) => setState(element as Value),
            [setState],
        );
    };

    const useRef = (): [Value, (element: HTMLElement | null) => void] => {
        const [state, setState] = useAtom(atomValue);
        const setRef = useCallback(
            (element: HTMLElement | null) => setState(element as Value),
            [setState],
        );
        return useMemo(() => [state, setRef], [state, setRef]);
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
                        const newState = action(state, payload); // ใช้ state
                        saving(newState, state);
                        setState(newState);
                    };
                }
            });
            return definedActions;
        }, [state]);
    };

    return { get, set, use, reset, ref, useRef, actions };
}
