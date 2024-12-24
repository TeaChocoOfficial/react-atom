//-Path: "react-atom/src/view/app/UseRef.tsx"
import { useEffect } from "react";
import { buttonAtom } from "../global/atom";

export default function UseRef() {
    const [ref, setRef] = buttonAtom.useRef();

    useEffect(() => {
        if (ref) {
            ref.textContent = "transform button";
        }
    }, [ref]);

    return (
        <>
            <h1>use atom ref</h1>
            <button ref={setRef}>some button</button>
        </>
    );
}
