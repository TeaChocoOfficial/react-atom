//-Path: "react-atom/src/view/global/atom.ts"
import { createAtom } from "@teachoco-official/react-atom";

export const SomeAtom = createAtom(0);

export const SomesAtom = createAtom(0);

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

interface DataProductPayload {
    addPrice: number;
    decrementPrice: number;
    setName: string;
}

export const DataProductAtom = createAtom<ProductState, DataProductPayload>(
    { name: "data product", price: 0 },
    {
        save: "data product atom",
        actions: {
            addPrice: (state, payload) => ({
                ...state,
                price: state.price + payload,
            }),
            decrementPrice: (state, payload) => ({
                ...state,
                price: state.price - payload,
            }),
            setName: (state, payload) => ({
                ...state,
                name: payload,
            }),
        },
    },

);

export const buttonAtom = createAtom<HTMLButtonElement | null>(null);
