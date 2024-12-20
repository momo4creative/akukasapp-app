import { authLogout } from '$lib/server/auth';
import type { PageServerLoad } from './$types';

export const load = (async (e) => {
    return await authLogout(e)
}) satisfies PageServerLoad;