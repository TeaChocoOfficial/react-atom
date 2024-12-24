//-Path: "react-atom/src/view/app/UseAtom.tsx"
import { useEffect } from "react";
import { SomesAtom } from "../global/atom";

export default function UsesAtom() {
    const someReset = SomesAtom.reset()
    const [someValue,setSomeValue] = SomesAtom.use();

    useEffect(() => {
        console.log(someValue);
    }, [someValue]);

    useEffect(() => {
        console.log(setSomeValue);
    }, [setSomeValue]);

    return (
        <div>
            <h1>uses atom</h1>
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
