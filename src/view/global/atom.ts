//-Path: "react-atom/src/view/global/atom.ts"
import { createAtom } from "@teachoco-official/react-atom";

export const SomeAtom = createAtom(0);

export const SaveAtom = createAtom(0, { save: "save atom" });

interface ProductState {
    name: string;
    price: number;
}
interface ProductPayload {
    setName: string;
    setPrice: number;
    updateProduct: Partial<ProductState>;
}

export const ProductAtom = createAtom<ProductState, ProductPayload>(
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

export const buttonAtom = createAtom<HTMLButtonElement | null>(null);
