//-Path: "react-atom/src/view/global/atom.ts"
import CreateAtom from "../../hook/createAtom";

export const SomeAtom = CreateAtom(0);

export const SaveAtom = CreateAtom(0, { save: "save atom" });

interface ProductState {
    name: string;
    price: number;
}
interface ProductPayload {
    setName: string;
    setPrice: number;
    updateProduct: Partial<ProductState>;
}

export const ProductAtom = CreateAtom<ProductState, ProductPayload>(
    { name: "product", price: 0 },
    {
        actions: {
            setName: (state, payload) => ({
                ...state,
                name: payload,
            }),
            setPrice: (state, payload) => ({
                ...state,
                price: payload,
            }),
            updateProduct: (state, payload) => ({
                ...state,
                ...payload,
            }),
        },
    },
);

export const buttonAtom = CreateAtom<HTMLButtonElement | null>(null);
