import { createAkunSchema, updateAkunSchema } from "$lib/schema/akun"
import { handleFail } from "$lib/utils/handle-action"
import { error, fail } from "@sveltejs/kit"
import db from "./db"
import { zodParce } from "./zod"
import { idSchema } from "$lib/schema/id"
import { createTransaksiSchema, createTransaksiSchemaTranform } from "$lib/schema/transaksi"


async function createApp<T extends Record<string, any>>(table: DbTable, data: DbCreate<T>[]) {
    db.params = { [table]: { create: data } }
    const res = await db.fetching<T[]>()
    return res
}

async function updateApp<T extends Record<string, any>>(table: DbTable, data: DbUpdate<T>[]) {
    db.params = { [table]: { update: data } }
    const res = await db.fetching<T[]>()
    return res
}

async function deleteApp(table: DbTable, id: string[]) {
    db.params = { [table]: { delete: id } }
    const res = await db.fetching<boolean[]>()
    return res
}

async function readApp<T extends Record<string, any>>(table: DbTable, opts: DbOptions<T> = {}) {
    db.params = { [table]: { read: opts } }
    const res = await db.fetching<DbReadResult<T>>()
    return res
}

async function summaryApp<T extends Record<string, any>>(table: DbTable, opts: DbOptions<T & Akun & Transaksi> = {}) {
    db.params = { [table]: { summary: opts } }
    const res = await db.fetching<DbReadResult<T>>()
    return res
}


export const akun = {
    create: async (request: Request) => {
        try {
            const data = await zodParce(request, createAkunSchema)
            const res = await createApp<Akun>('akun', [data])
            return res[0]
        } catch (e) {
            return fail(400, handleFail<typeof createAkunSchema>(e))
        }
    },
    update: async (request: Request) => {
        try {
            const data = await zodParce(request, updateAkunSchema)
            const res = await updateApp<Akun>('akun', [data])
            return res[0]
        } catch (e) {
            return fail(400, handleFail<typeof updateAkunSchema>(e))
        }
    },
    delete: async (request: Request) => {
        try {
            const { id } = await zodParce(request, idSchema)
            const res = await deleteApp('akun', [id])
            return res[0]
        } catch (e) {
            return fail(400, handleFail<typeof idSchema>(e))
        }
    },

    read: async (opts: DbOptions<Akun> = {}) => {
        try {
            const res = await readApp<Akun>('akun', opts)
            return res
        } catch (e) {
            const err = handleFail(e)
            return error(err.status, err)
        }
    },

    summary: async (opts: DbOptions<AkunTransaksi> = {}) => {
        try {
            const res = await summaryApp<SummaryAkun>('akun', opts)
            return res
        } catch (e) {
            const err = handleFail(e)
            return error(err.status, err)
        }
    },

}

export const transaksi = {
    create: async (request: Request) => {
        try {
            const form = await zodParce(request, createTransaksiSchemaTranform)
            const result = await createApp<Transaksi>('transaksi', form)
            return result
        } catch (e) {
            return fail(400, handleFail<typeof createTransaksiSchema>(e))
        }
    },
    update: async (request: Request) => { },

    delete: async (request: Request) => { },

    read: async (opts: DbOptions<Transaksi> = {}) => {
        try {
            const res = await readApp<Transaksi>('transaksi', opts)
            return res
        } catch (e) {
            const err = handleFail(e)
            return error(err.status, err)
        }
    },
    summary: async (opts: DbOptions<SummaryTransaksi> = {}) => {
        try {
            const res = await summaryApp<SummaryTransaksi>('transaksi', opts)
            return res
        } catch (e) {
            const err = handleFail(e)
            return error(err.status, err)
        }
    },
}