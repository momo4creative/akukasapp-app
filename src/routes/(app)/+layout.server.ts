import { akun, transaksi } from '$lib/server/app';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals: { user } }) => {
    return {
        user,
        promiseAkun: akun.read(),
        promiseLastTransaksi: transaksi.read({
            _sort: { created_at: 'desc' },
            _order: [0, 1]
        })
    };
}) satisfies LayoutServerLoad;