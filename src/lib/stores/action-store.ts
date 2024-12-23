import { writable } from "svelte/store"

type Store = {
    isCreate?: boolean
    isUpdate?: boolean
    isDelete?: boolean
    data?: Record<string, any>
    id?: string
}

export const actionStore = function () {
    const { subscribe, set, update } = writable<Store>({})

    return {
        subscribe,

        create() {
            set({ isCreate: true })
        },

        update<T extends Record<string, any>>(data: T) {
            set({ isUpdate: true, data })
        },

        delete(id: string) {
            set({ isDelete: true, id })
        },

        close() {
            set({})
        }
    }
}()