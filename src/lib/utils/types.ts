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
    uraian: string
    masuk: number
    keluar: number
    created_at: string | Date
    updated_at?: string | Date
}
