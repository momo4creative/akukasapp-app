import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { akun } from "$lib/server/app";

export const load = (async () => {
    console.log('Load : /transaksi page server');

    return {
    };
}) satisfies PageServerLoad;


export const actions = {
    create: async ({ request }) => await akun.create(request),
    update: async ({ request }) => await akun.update(request),
    delete: async ({ request }) => await akun.delete(request),
} satisfies Actions