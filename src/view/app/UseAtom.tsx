//-Path: "react-atom/src/view/app/UseAtom.tsx"
import { useEffect } from "react";
import { SomeAtom } from "../global/atom";

export default function UseAtom() {
    const someValue = SomeAtom.get();
    const someReset = SomeAtom.reset();
    const setSomeValue = SomeAtom.set();

    useEffect(() => {
        console.log(someValue);
    }, [someValue]);

    useEffect(() => {
        console.log(setSomeValue);
    }, [setSomeValue]);

    return (
        <div>
            <h1>use atom</h1>
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
            <button onClick={someReset}>reset</button>
        </div>
    );
}
