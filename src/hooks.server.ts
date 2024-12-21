import { setSession } from "$lib/server/db";
import { verifyToken } from "$lib/server/secure";
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const auth: Handle = async ({ event, resolve }) => {
    event.locals.user = null
    const sessionId = event.cookies.get('sessionId')
    if (sessionId) {
        const payload = verifyToken(sessionId)
        if (payload) setSession(payload.session)
        event.locals.user = payload
    }
    return resolve(event)
}

const guard: Handle = async ({ event, resolve }) => {
    if (!event.locals.user && !event.url.pathname.startsWith('/auth'))
        return redirect(303, '/auth/login')
    return resolve(event)
}

export const handle: Handle = sequence(auth, guard)