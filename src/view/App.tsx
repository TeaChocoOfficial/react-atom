//-Path: "react-atom/src/view/App.tsx"
import UseAtom from "./app/UseAtom";
import { SomeAtom } from "./global/atom";
import UseAtomSave from "./app/UseAtomSave";
import UseAction from "./app/UseAction";

export default function App() {
    return (
        <>
            <h1>hello world</h1>
            <UseAction />
        </>
    );
}
