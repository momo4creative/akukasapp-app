type User = {
    id: string
    username: string
    password: string
    session?: string
    created_at: string | Date
}

type Payload = Required<Pick<User, 'username' | 'session'>>

type Akun = {
    id: string
    user_id: string
    kode: number
    uraian: string
    batas?: number
    created_at: string | Date
    updated_at?: string | Date
}

type Transaksi = {
    id: string
    user_id: string
    akun_id: string
    tanggal: string | Date
    kode: string
    uraian: string
    nilai: number
    created_at: string | Date
    updated_at?: string | Date
}

type SummaryAkun = Akun & {
    transaksi: Transaksi[]
    nilai: number
}

type AkunTransaksi = Akun & Transaksi

type SummaryTransaksi = Transaksi & { akun: Akun }
