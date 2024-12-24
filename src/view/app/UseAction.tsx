//-Path: "react-atom/src/view/app/UseAction.tsx"
import { ProductAtom } from "../global/atom";

export default function UseAction() {
    const someValue = ProductAtom.get();
    const { setPrice, setName } = ProductAtom.actions();

    return (
        <div>
            <h1>use action atom</h1>
            <p>Name: {someValue.name}</p>
            <button onClick={() => setName("new name")}>new name</button>
            <p>Price: {someValue.price}</p>
            <button onClick={() => setPrice(100)}>Set Price to $100</button>
            <button onClick={() => setPrice(200)}>Set Price to $200</button>
            <button onClick={() => setPrice(300)}>Set Price to $300</button>
            <button onClick={() => setPrice(500)}>Set Price to $500</button>
        </div>
    );
}
