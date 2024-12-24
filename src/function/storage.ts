//-Path: "TeaChoco-Official/client/src/hook/function/storage.ts"

export function getStorage<Data = string>(key: string): Data | undefined {
    if (localStorage?.getItem !== undefined) {
        const data = localStorage.getItem(key) as Data;
        if (data === null) {
            return undefined;
        } else {
            try {
                return JSON.parse(localStorage.getItem(key) as string) as Data;
            } catch (_) {
                return localStorage.getItem(key) as Data;
            }
        }
    }
}

export function setStorage<Data = string | undefined>(
    key: string,
    value: Data,
) {
    if (localStorage?.setItem !== undefined) {
        localStorage.setItem(
            key,
            typeof value === "string" ? value : JSON.stringify(value),
        );
    }
}
