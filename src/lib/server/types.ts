type DbTable = 'auth' | 'anggaran' | 'transaksi'
type DbAction = 'read' | 'create' | 'update' | 'delete' | 'summary' | 'register' | 'login' | 'logout'

type DbParams = Partial<Record<DbTable, Partial<Record<DbAction, any>>>>

type DbReadResult<T> = { data: T[]; page: number; limit: number; count: number; more: boolean; }


type DbOptions<T> = {
    _where?: Partial<Record<keyof T, any>>
    _sort?: Partial<Record<keyof T, 'asc' | 'desc'>>
    _order?: number[]
    _select?: Partial<(keyof T)[]>
    _month?: Partial<Record<keyof T, number>>
    _year?: Partial<Record<keyof T, number>>
}