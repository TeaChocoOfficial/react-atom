//-Path: "react-atom/src/view/app/UseAcionSave.tsx"
import { useEffect } from "react";
import { DataProductAtom } from "../global/atom";

export default function UseAcionSave() {
    const value = DataProductAtom.get();
    const { addPrice, decrementPrice, setName } = DataProductAtom.actions();

    useEffect(() => {
        console.log(value);
    }, [value]);

    useEffect(() => {
        console.log(value);
    }, [value]);

    return (
        <div>
            <h1>use action atom</h1>
            <p>Name: {value.name}</p>
            <input
                value={value.name}
                onChange={(e) => setName(e.target.value)}
            />
            <p>Price: {value.price}</p>
            <button onClick={() => addPrice(10)}>Add Price</button>
            <button onClick={() => decrementPrice(10)}>Decrement Price</button>
        </div>
    );
}
