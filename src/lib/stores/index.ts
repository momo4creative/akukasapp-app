import { getContext, setContext } from "svelte"
import { writable, type Writable } from "svelte/store"

type Store<T> = {
    loading?: boolean
    error?: true
    message?: string
} & Partial<DbReadResult<T>>

export const createStore = <T>() => {
    const { subscribe, set, update } = writable<Store<T>>()

    return {
        subscribe,
        async init(promise: Promise<DbReadResult<T>>) {
            try {
                set({ loading: true })
                const data = await promise
                set(data)
            } catch (err) {
                set({ error: true, message: 'kesalahan' })
            }
        }
    }
}

const transaksiStore = createStore<SummaryTransaksi>()
const transaksiKey = Symbol('transaksi')

export const transaksi = {
    setContext(data: Promise<DbReadResult<SummaryTransaksi>>) {
        transaksiStore.init(data)
        setContext(transaksiKey, transaksiStore)
    },
    getContext() {
        return getContext(transaksiKey) as Writable<Store<SummaryTransaksi>>
    }
}



// export function setContextData<T>(key: string, data: Promise<DbReadResult<T>>) {
//     store.init(data)
//     setContext(key, store)
// }
// export function getContextData<T>(key: string) {
//     return getContext(key)
// }