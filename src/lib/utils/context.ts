import { getContext, setContext } from "svelte";
const keyAkun = Symbol('key')
const keyTransaksi = Symbol('key')
type Data<T> = Promise<DbReadResult<T>>

export function getAkuns() {
    return getContext<Data<Akun>>(keyAkun)
}


export function setAkuns(val: Data<Akun>) {
    setContext<Data<Akun>>(keyAkun, val)
}

export function setPromiseLastTransaksi(val: Data<Transaksi>) {
    setContext<Data<Transaksi>>(keyTransaksi, val)
}

export function getPromiseLastTransaksi() {
    return getContext<Data<Transaksi>>(keyTransaksi)
}