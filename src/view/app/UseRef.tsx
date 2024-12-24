//-Path: "react-atom/src/view/app/UseRef.tsx"
import { useEffect, useState } from "react";

export default function UseRef() {
    const [ref, setRef] = useState<HTMLButtonElement | null>(null);

    useEffect(() => {
        console.log(ref);
        if (ref) {
            ref.textContent = "some text";
        }
    }, [ref]);

    return <button ref={(element) => setRef(element)}>some button</button>;
}
