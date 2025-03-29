//-Path: "react-atom/src/hook/AtomProvider.tsx"
import { createStore, Provider } from "jotai";

export type AtomProviderProps = {
    store?: ReturnType<typeof createStore>;
    children?: React.ReactNode;
};

export function AtomProvider({ children, store }: AtomProviderProps) {
    return <Provider store={store}>{children}</Provider>;
}
