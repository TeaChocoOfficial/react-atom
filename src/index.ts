//-Path: "react-atom/src/index.ts"
//* hook
// * createAtom.tsx
import createAtom from "./hook/createAtom";
//* types
// * atom.ts
export type {
    CreateAtomType,
    AtomPayloadsType,
    AtomType,
    AtomUseActionType,
    AtomUseActionsType,
    AtomActionsType,
    AtomActionType,
    AtomOptionType,
} from "./types/atom";

export { createAtom };
