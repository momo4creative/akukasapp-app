import { akun, transaksi } from '$lib/server/app';
import type { LayoutServerLoad } from './$types';


const d = new Date()

export const load = (async ({ locals: { user } }) => {
    const bln = d.getMonth() + 1
    const thn = d.getFullYear()
    return {
        user,
        promiseSummaryAkun: akun.summary({
            _month: { tanggal: bln },
            _year: { tanggal: thn },
        }),
        promiseLastTransaksi: transaksi.read({
            _sort: { created_at: 'desc' },
            _order: [0, 1]
        })
    };
}) satisfies LayoutServerLoad;