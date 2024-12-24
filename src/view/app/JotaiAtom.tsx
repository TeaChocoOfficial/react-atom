//-Path: "react-atom/src/view/app/JotaiAtom.tsx"
import { useEffect } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";

const myAtom = atom(0);

export default function JotaiAtom() {
    const someValue = useAtomValue(myAtom);
    const setSomeValue = useSetAtom(myAtom);

    useEffect(() => {
        console.log(someValue);
    }, [someValue]);

    useEffect(() => {
        console.log(setSomeValue);
    }, [setSomeValue]);

    return (
        <div>
            <h1>use atom in jotai</h1>
            <p>Count: {someValue}</p>
            <button
                onClick={() => {
                    setSomeValue((prev) => prev + 1);
                    // console.log(someValue);
                }}>
                add Value
            </button>
            <button
                onClick={() => {
                    setSomeValue((prev) => prev - 1);
                    // console.log(someValue);
                }}>
                remove Value
            </button>
        </div>
    );
}
