import { authLogin, authLogout, authRegister } from '$lib/server/auth';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {}
}) satisfies PageServerLoad;


export const actions = {
    register: async (event) => await authRegister(event),
    login: async (event) => await authLogin(event)
} satisfies Actions