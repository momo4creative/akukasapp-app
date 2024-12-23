import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { transaksi } from '$lib/server/app';

export const load = (async () => {
    return {
        promiseListTransaksi: transaksi.summary({
            _sort: { created_at: 'desc' },
            _order: [0, 10]
        })
    };
}) satisfies PageServerLoad;


export const actions = {
    create: async ({ request }) => await transaksi.create(request),
    update: async ({ request }) => await transaksi.update(request),
    delete: async ({ request }) => await transaksi.delete(request),
} satisfies Actions 