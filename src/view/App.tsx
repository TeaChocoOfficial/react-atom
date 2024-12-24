//-Path: "react-atom/src/view/App.tsx"
import UseAtom from "./app/UseAtom";
import UseAction from "./app/UseAction";
import { SomeAtom } from "./global/atom";
import UseAtomSave from "./app/UseAtomSave";
import UseRef from "./app/UseRef";
import JotaiAtom from "./app/JotaiAtom";
import UseAcionSave from "./app/UseAcionSave";
import UsesAtom from "./app/UsesAtom";

export default function App() {
    return (
        <>
            <h1>hello world</h1>
            <JotaiAtom />
            <UseAtom />
            <UsesAtom />
            <UseRef />
            <UseAction />
            <UseAtomSave />
            <UseAcionSave />
        </>
    );
}
