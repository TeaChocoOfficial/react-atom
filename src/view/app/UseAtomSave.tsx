//-Path: "react-atom/src/view/app/UseAtomSave.tsx"
import { useEffect } from "react";
import { SaveAtom } from "../global/atom";

export default function UseAtomSave() {
    const someValue = SaveAtom.get();
    const someReset = SaveAtom.reset();
    const setSomeValue = SaveAtom.set();

    useEffect(() => {
        // console.log(someValue);
    }, [someValue]);

    return (
        <div>
            <h1>use atom with save</h1>
            <p>Count: {someValue}</p>
            <button
                onClick={() => {
                    setSomeValue((prev) => prev + 1);
                    // console.log(someValue);
                }}>
                add Value
            </button>
            <button onClick={someReset}>reset</button>
        </div>
    );
}
