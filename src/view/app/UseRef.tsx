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

    return <button ref={setRef}>some button</button>;
}

export function Component() {
    const buttonRef = buttonAtom.ref();

    return <button ref={buttonRef}>some button</button>;
}
